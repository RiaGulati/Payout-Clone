// Figma: "Onboarding - 11" (137:105) — logo, "Estimating settlements…" with spinner.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingBody } from '@/components/onboarding/onboarding-text';
import { Ui } from '@/constants/colors';
import { ONBOARDING_ROUTES } from '@/constants/onboarding';

const AUTO_ADVANCE_MS = 2500;

/**
 * Figma "Circular-indeterminate progress indicator" (M3 kit, 137:233): 40pt, 4pt thick,
 * secondary-container track with a primary active arc. It's a library component with no
 * exported asset, so it's drawn with bordered Views and the arc spun with Reanimated.
 */
function CircularProgress() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1);
  }, [rotation]);

  const arcStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.spinner} accessibilityRole="progressbar" accessibilityLabel="Loading">
      <View style={styles.spinnerTrack} />
      <Animated.View style={[styles.spinnerArc, arcStyle]} />
    </View>
  );
}

export default function EstimatingScreen() {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      timer.current = null;
      router.push(ONBOARDING_ROUTES.estimate);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const goNext = () => {
    // Cancel the pending auto-advance so we don't push the next screen twice
    // (this screen stays mounted underneath in the stack).
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    router.push(ONBOARDING_ROUTES.estimate);
  };

  return (
    <OnboardingLayout
      background="welcome"
      progress={301 / 365}
      onPress={goNext}
      contentStyle={styles.content}>
      <View style={styles.stack}>
        <Image
          source={require('@/assets/images/brand/mode-logo.png')}
          style={styles.logo}
          contentFit="cover"
          accessibilityLabel="mode mobile"
        />
        <OnboardingBody style={styles.message}>Estimating settlements you can claim now!</OnboardingBody>
        <CircularProgress />
      </View>
    </OnboardingLayout>
  );
}

const SPINNER_SIZE = 40;
const SPINNER_THICKNESS = 4;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    // Logo top sits at y329 in the 956pt frame.
    paddingTop: 256,
  },
  stack: {
    alignItems: 'center',
  },
  logo: {
    width: 263,
    height: 108,
  },
  message: {
    // Figma "body-large" bold: 16/24, tracking 0.5; 2 lines centered at y478 → top y454.
    marginTop: 17,
    lineHeight: 24,
    maxWidth: 312,
  },
  spinner: {
    // Spinner top at y568, 66pt below the message (bottom y502).
    marginTop: 66,
    width: SPINNER_SIZE,
    height: SPINNER_SIZE,
  },
  spinnerTrack: {
    ...StyleSheet.absoluteFill,
    borderRadius: SPINNER_SIZE / 2,
    borderWidth: SPINNER_THICKNESS,
    borderColor: Ui.m3SecondaryContainer,
  },
  spinnerArc: {
    ...StyleSheet.absoluteFill,
    borderRadius: SPINNER_SIZE / 2,
    borderWidth: SPINNER_THICKNESS,
    borderColor: Ui.transparent,
    borderTopColor: Ui.m3Primary,
  },
});
