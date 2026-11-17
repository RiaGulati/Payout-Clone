// Figma: "Forms - with forms - 4" (314:1055) and "Forms - without forms" (314:706).
// Variants 1–3 (314:763, 245:472, 314:967) are earlier explorations of the same screen.
// Variant 4 also has a clipped chip row (Pending … Rejected Ads, Overbilling) at y=796; it is a leftover
// from the Home category chips and is intentionally not implemented.
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ErrorState, LoadingState } from '@/components/app/load-state';
import { FormRow } from '@/components/forms/form-row';
import { FormsEmptyState } from '@/components/forms/forms-empty-state';
import { FormsHeader } from '@/components/forms/forms-header';
import { StatusFilter } from '@/components/forms/status-filter';
import { Ui } from '@/constants/colors';
import { FORM_STATUSES, type FormStatus, type SavedForm } from '@/data/forms';
import { useRemoteData } from '@/hooks/use-remote-data';
import { fetchForms } from '@/lib/api';

export default function FormsScreen() {
  const [status, setStatus] = useState<FormStatus | null>(null);
  // Live: new forms and status changes in Supabase refresh the list.
  const { state, retry } = useRemoteData(fetchForms, undefined, { realtimeTable: 'forms' });

  if (state.status !== 'ready') {
    return (
      <View style={styles.screen}>
        <FormsHeader fileCount={0} />
        {state.status === 'loading' ? <LoadingState /> : <ErrorState onRetry={retry} />}
      </View>
    );
  }

  const savedForms: SavedForm[] = state.data;
  const visible = status ? savedForms.filter((f) => f.status === status) : savedForms;
  const hasForms = savedForms.length > 0;
  const statusLabel = FORM_STATUSES.find((s) => s.value === status)?.label;

  return (
    <View style={styles.screen}>
      <FormsHeader fileCount={savedForms.length} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {hasForms ? (
          <>
            <View style={styles.filter}>
              <StatusFilter selected={status} onChange={setStatus} />
            </View>
            {visible.length > 0 ? (
              <View style={styles.list}>
                {visible.map((form) => (
                  <FormRow key={form.id} form={form} />
                ))}
              </View>
            ) : (
              <View style={styles.list}>
                <FormsEmptyState
                  title={`No ${statusLabel?.toLowerCase()} forms`}
                  body="Forms with this status will appear here"
                />
              </View>
            )}
          </>
        ) : (
          <View style={styles.emptyWrap}>
            <FormsEmptyState />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Ui.appBackground,
  },
  content: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  filter: {
    marginTop: 10,
    paddingLeft: 3,
  },
  // Rows sit at x=19, w=399 in the 440pt frame; legend at x=23, y=139; rows at y=185.
  list: {
    marginTop: 18,
    gap: 12,
  },
  emptyWrap: {
    marginTop: 25,
  },
});
