// Figma: "Onboarding - 15" (137:245) — subscription paywall at the end of onboarding.
import { router } from 'expo-router';

import { PaywallScreen } from '@/components/paywall/paywall-screen';
import { ONBOARDING_ROUTES } from '@/constants/onboarding';

export default function OnboardingPaywallScreen() {
  const next = () => router.push(ONBOARDING_ROUTES.offer);
  return <PaywallScreen onClose={next} onContinue={next} />;
}
