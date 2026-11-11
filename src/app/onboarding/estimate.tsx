// Figma: "Onboarding - 12" (137:124) — estimated $4.822 B payout, "Claim My Cash".
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingBody, OnboardingTitle } from '@/components/onboarding/onboarding-text';
import { ONBOARDING_ROUTES } from '@/constants/onboarding';

export default function EstimateScreen() {
  return (
    <OnboardingLayout
      background="welcome"
      progress={1}
      buttonLabel="Claim My Cash"
      onPress={() => router.push(ONBOARDING_ROUTES.paywall)}
      contentStyle={styles.content}>
      <View style={styles.stack}>
        <Image
          source={require('@/assets/images/brand/mode-logo.png')}
          style={styles.logo}
          contentFit="cover"
          accessibilityLabel="mode mobile"
        />
        <OnboardingTitle style={styles.amount}>$4.822 B</OnboardingTitle>
        <OnboardingBody style={styles.caption}>
          Brands you selected are estimated to pay this much out to Class Actions
        </OnboardingBody>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    // Logo top sits at y256 in the 956pt frame.
    paddingTop: 183,
  },
  stack: {
    alignItems: 'center',
    width: 292,
    maxWidth: '100%',
  },
  logo: {
    width: 263,
    height: 108,
  },
  amount: {
    // SF Black 40/40, tracking 2 (upright). Figma's 86pt box sits 30pt below the logo with
    // the line centered in it → text top y417.
    fontStyle: 'normal',
    marginTop: 53,
    maxWidth: 292,
  },
  caption: {
    // Figma "body-large" bold 16/24, tracking 0.5. Its 48pt box (y510) holds 3 centered
    // lines, so the text starts at y498.
    marginTop: 41,
    lineHeight: 24,
    maxWidth: 292,
  },
});
