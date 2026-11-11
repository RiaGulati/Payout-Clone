import { Redirect } from 'expo-router';

import { ONBOARDING_ROUTES } from '@/constants/onboarding';

/** App entry: start the onboarding flow. */
export default function Index() {
  return <Redirect href={ONBOARDING_ROUTES.welcome} />;
}
