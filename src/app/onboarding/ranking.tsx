// Figma: "Onboarding - 8" (111:235) — #1 Class Action Payout App, star rating.
import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingBody, OnboardingTitle } from '@/components/onboarding/onboarding-text';
import { Ui } from '@/constants/colors';
import { ONBOARDING_ROUTES } from '@/constants/onboarding';

export default function RankingScreen() {
  return (
    <OnboardingLayout
      background="welcome"
      progress={222 / 365}
      onPress={() => router.push(ONBOARDING_ROUTES.brands)}
      contentStyle={styles.content}>
      <OnboardingBody style={styles.label}>{'Class Action\nPayout App'}</OnboardingBody>
      <OnboardingTitle style={styles.rank}>#1</OnboardingTitle>
      <Text style={styles.stars} numberOfLines={1} accessibilityLabel="Five star rating">
        ⭐️⭐⭐⭐⭐
      </Text>
      <OnboardingBody style={[styles.label, styles.trusted]}>Trusted by thousands of users</OnboardingBody>
    </OnboardingLayout>
  );
}

const heroShadow = {
  textShadowColor: Ui.shadowStrong,
  textShadowOffset: { width: 0, height: 4 },
  textShadowRadius: 4,
} as const;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    // Two 24pt label lines centered at y297 → top y273.
    paddingTop: 200,
  },
  label: {
    maxWidth: 285,
    lineHeight: 24,
  },
  rank: {
    // SF Pro Black Italic 96, tracking 1.5, centered at y417. Figma's line height is 40;
    // a 100pt line box keeps the glyphs unclipped with the same center.
    fontSize: 96,
    lineHeight: 100,
    letterSpacing: 1.5,
    maxWidth: 343,
    marginTop: 46,
    ...heroShadow,
  },
  stars: {
    // 64pt emoji row, tracking 1.5, centered at y554 (76pt line box → top y516).
    fontSize: 64,
    lineHeight: 76,
    letterSpacing: 1.5,
    textAlign: 'center',
    marginTop: 49,
    ...heroShadow,
  },
  trusted: {
    // Single 24pt line centered at y625 → top y613.
    marginTop: 21,
  },
});
