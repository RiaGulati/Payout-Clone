// Figma: "Onboarding - 16" (314:595) — in-app paywall opened from Home's "Upgrade" button.
import { router } from 'expo-router';

import { PaywallScreen } from '@/components/paywall/paywall-screen';

export default function UpgradeScreen() {
  // Frontend only: no purchase flow, so Continue just dismisses the modal.
  return <PaywallScreen onClose={() => router.back()} onContinue={() => router.back()} />;
}
