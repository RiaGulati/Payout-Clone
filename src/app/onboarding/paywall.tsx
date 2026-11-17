// Figma: "Onboarding - 15" (137:245) — subscription paywall at the end of onboarding.
import { router } from 'expo-router';

import { PaywallScreen } from '@/components/paywall/paywall-screen';
import { ONBOARDING_ROUTES } from '@/constants/onboarding';
import { markPaywallSeen } from '@/lib/api';

export default function OnboardingPaywallScreen() {
  const next = () => {
    // Saved as soon as the paywall is left, so later launches go straight to Home (the offer is one-time).
    markPaywallSeen().catch((error) => console.warn('Failed to save paywall_seen:', error?.message ?? error));
    router.push(ONBOARDING_ROUTES.offer);
  };
  return <PaywallScreen onClose={next} onContinue={next} />;
}
