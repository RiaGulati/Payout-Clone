import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY ?? '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_KEY. Copy .env.example to .env and fill them in.');
}

// `web.output: "server"` renders routes on the server too, where there's no storage to keep a session in.
const isServer = Platform.OS === 'web' && typeof window === 'undefined';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: isServer ? undefined : AsyncStorage,
    autoRefreshToken: !isServer,
    persistSession: !isServer,
    detectSessionInUrl: false,
  },
});

// Only refresh tokens while the app is in the foreground.
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });
}

let session: Promise<string> | null = null;

/**
 * Resolves with the signed-in user's id: restores the saved session, or signs in anonymously the
 * first time. Every query awaits this first so row level security sees an authenticated user.
 * Requires "Allow anonymous sign-ins" in Supabase → Authentication → Sign In / Providers.
 */
export function sessionReady(): Promise<string> {
  if (!session) {
    session = (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) return data.session.user.id;

      const { data: signedIn, error } = await supabase.auth.signInAnonymously();
      if (error || !signedIn.user) throw error ?? new Error('Anonymous sign-in failed');
      return signedIn.user.id;
    })();
    // A failed sign-in (e.g. offline) shouldn't stick; the next call tries again.
    session.catch(() => {
      session = null;
    });
  }
  return session;
}
