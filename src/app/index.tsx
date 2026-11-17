import { Redirect } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Ui } from '@/constants/colors';
import { APP_HOME_ROUTE, ONBOARDING_ROUTES } from '@/constants/onboarding';
import { useRemoteData } from '@/hooks/use-remote-data';
import { fetchProfileStage } from '@/lib/api';

/**
 * App entry: picks the first screen from the user's saved profile. New users start onboarding, users who
 * answered the questions but never left the paywall see it again, everyone else lands on Home.
 */
export default function Index() {
  const { state } = useRemoteData(fetchProfileStage, undefined);

  if (state.status === 'loading') return <View style={styles.blank} />;
  // Can't reach Supabase (e.g. offline on first launch): fall back to onboarding.
  if (state.status === 'error' || state.data === 'onboarding') return <Redirect href={ONBOARDING_ROUTES.welcome} />;
  if (state.data === 'paywall') return <Redirect href={ONBOARDING_ROUTES.paywall} />;
  return <Redirect href={APP_HOME_ROUTE} />;
}

const styles = StyleSheet.create({
  blank: {
    flex: 1,
    backgroundColor: Ui.appBackground,
  },
});
