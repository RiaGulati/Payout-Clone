import { useEffect, useState } from 'react';

import { sessionReady, supabase } from '@/lib/supabase';

export type RemoteData<T> = { status: 'loading' } | { status: 'error' } | { status: 'ready'; data: T };

type Settled<T> = Exclude<RemoteData<T>, { status: 'loading' }>;

/**
 * Loads `fetcher(arg)` and returns its loading / error / ready state plus `retry`.
 *
 * With `realtimeTable`, any insert, update or delete on that table for the signed-in user triggers a
 * silent refetch: the screen keeps showing the current data instead of flashing back to loading, and
 * a failed refresh keeps the last good data. Realtime only delivers rows RLS lets this user see.
 *
 * `fetcher` must be a module-level function (e.g. from src/lib/api.ts) so it doesn't change between renders.
 */
export function useRemoteData<T, A = void>(
  fetcher: (arg: A) => Promise<T>,
  arg: A,
  options: { realtimeTable?: 'claims' | 'forms' } = {},
) {
  const { realtimeTable } = options;
  const [attempt, setAttempt] = useState(0);
  // A result only counts while its key matches the current request, so changing `arg` or retrying
  // shows loading without a synchronous setState inside the effect.
  const [result, setResult] = useState<{ key: string; state: Settled<T> } | null>(null);
  const key = `${String(arg)}:${attempt}`;

  useEffect(() => {
    let cancelled = false;

    const load = (isRefresh: boolean) =>
      fetcher(arg)
        .then((data) => {
          if (!cancelled) setResult({ key, state: { status: 'ready', data } });
        })
        .catch((error) => {
          console.warn('Load failed:', error?.message ?? error);
          if (!cancelled && !isRefresh) setResult({ key, state: { status: 'error' } });
        });

    load(false);
    if (!realtimeTable) {
      return () => {
        cancelled = true;
      };
    }

    let channel: ReturnType<typeof supabase.channel> | undefined;
    sessionReady()
      .then((userId) => {
        if (cancelled) return;
        channel = supabase
          // Unique name per mount: two screens subscribing to the same table mustn't share a channel.
          .channel(`${realtimeTable}-${userId}-${Math.random().toString(36).slice(2)}`)
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: realtimeTable, filter: `user_id=eq.${userId}` },
            () => load(true),
          )
          .subscribe();
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (channel) supabase.removeChannel(channel);
    };
  }, [fetcher, arg, realtimeTable, key]);

  const state: RemoteData<T> = result?.key === key ? result.state : { status: 'loading' };
  return { state, retry: () => setAttempt((n) => n + 1) };
}
