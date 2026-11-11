// Figma: "Onboarding - 1" (1:39) — what class action settlements are.
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingBody, OnboardingTitle } from '@/components/onboarding/onboarding-text';
import { ONBOARDING_ROUTES } from '@/constants/onboarding';

export default function ClassActionsScreen() {
  return (
    <OnboardingLayout
      progress={30 / 365}
      onPress={() => router.push(ONBOARDING_ROUTES.billion)}
      contentStyle={styles.content}>
      <View style={styles.stack}>
        <Text style={styles.emoji} accessibilityLabel="Judge">
          👩‍⚖️
        </Text>
        <OnboardingTitle>Class Action Settlements</OnboardingTitle>
        <OnboardingBody>
          Are when companies have to pay money to customers because they may have done something
          wrong or illegal.
        </OnboardingBody>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    // Emoji top sits at ~y315 in the 956pt frame (≈240pt below the progress bar).
    paddingTop: 230,
  },
  stack: {
    alignItems: 'center',
    gap: 22,
  },
  emoji: {
    fontSize: 100,
    lineHeight: 120,
  },
});
