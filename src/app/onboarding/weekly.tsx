// Figma: "Onboarding - 4" (15:218) — new settlements to claim every week.
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingBody, OnboardingTitle } from '@/components/onboarding/onboarding-text';
import { WeeklyLogoCluster } from '@/components/onboarding/weekly-logo-cluster';
import { ONBOARDING_ROUTES } from '@/constants/onboarding';

export default function WeeklyScreen() {
  return (
    <OnboardingLayout
      // The Figma frame uses the same background bitmap as the welcome step.
      background="welcome"
      progress={96 / 365}
      onPress={() => router.push(ONBOARDING_ROUTES.tracking)}
      contentStyle={styles.content}>
      <WeeklyLogoCluster />
      <OnboardingTitle style={styles.title}>New Settlements to claim every week</OnboardingTitle>
      <OnboardingBody style={styles.body}>
        Many of the largest companies often pay penalties for misleading people. ModeMobile finds
        and organizes these opportunities for you to claim your cash.
      </OnboardingBody>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    // Logo cluster top sits at y≈152 in the 956pt frame (≈79pt below the progress bar).
    paddingTop: 79,
  },
  title: {
    fontSize: 30,
    maxWidth: 343,
    marginTop: 86,
  },
  body: {
    lineHeight: 20,
    maxWidth: 348,
    marginTop: 21,
  },
});
