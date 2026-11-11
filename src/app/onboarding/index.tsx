// Figma: "Onboarding - 3" (15:64) — welcome / Get Started.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { Ui } from '@/constants/colors';
import { ONBOARDING_ROUTES } from '@/constants/onboarding';
import { Typography } from '@/constants/typography';

export default function WelcomeScreen() {
  return (
    <OnboardingLayout
      background="welcome"
      buttonLabel="Get Started"
      onPress={() => router.push(ONBOARDING_ROUTES.classActions)}
      contentStyle={styles.content}
      footnote={
        <Text style={styles.terms}>
          by continuing you agree to our <Text style={styles.link}>Terms of Use</Text> and{' '}
          <Text style={styles.link}>Class Action Terms</Text>
        </Text>
      }>
      <Image
        source={require('@/assets/images/brand/mode-logo.png')}
        style={styles.logo}
        contentFit="cover"
        accessibilityLabel="mode mobile"
      />
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    // Logo center sits at y≈408 in the 956pt frame, slightly above the content midpoint.
    paddingBottom: 40,
  },
  logo: {
    width: 263,
    height: 108,
  },
  terms: {
    ...Typography.bodyLargeEmphasized,
    color: Ui.white,
    textAlign: 'center',
    maxWidth: 299,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
