// Figma: "Onboarding - 2" (1:53) — $1.3 Billion awarded last year.
import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingBody, OnboardingTitle } from '@/components/onboarding/onboarding-text';
import { ONBOARDING_ROUTES } from '@/constants/onboarding';

export default function BillionScreen() {
  return (
    <OnboardingLayout
      // The Figma frame uses the same background bitmap as the welcome step.
      background="welcome"
      progress={64 / 365}
      onPress={() => router.push(ONBOARDING_ROUTES.weekly)}
      contentStyle={styles.content}>
      <OnboardingBody style={styles.intro}>
        {'Last year people\nlike you were awarded'}
      </OnboardingBody>
      <Text style={styles.emoji} accessibilityLabel="Money bag">
        💰
      </Text>
      <OnboardingTitle>$1.3 Billion</OnboardingTitle>
      <OnboardingBody style={styles.body}>
        Companies have to pay money to customers, but it is up to the people to claim the reward.
      </OnboardingBody>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    // Intro copy top sits at y≈273 in the 956pt frame (≈200pt below the progress bar).
    paddingTop: 200,
  },
  intro: {
    lineHeight: 24,
    maxWidth: 285,
  },
  emoji: {
    fontSize: 120,
    lineHeight: 140,
    marginTop: 22,
    marginBottom: 14,
  },
  body: {
    lineHeight: 24,
    marginTop: 45,
  },
});
