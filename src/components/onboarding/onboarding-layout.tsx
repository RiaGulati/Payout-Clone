import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PillButton } from '@/components/pill-button';
import { Ui } from '@/constants/colors';

const backgrounds = {
  default: require('@/assets/images/onboarding/money-background.png'),
  welcome: require('@/assets/images/onboarding/money-background-welcome.png'),
} as const;

/** Distance from the bottom of the 956pt Figma frame to the top of the CTA (956 - 767). */
const FOOTER_HEIGHT = 189;
/** Home-indicator inset baked into the Figma frame. */
const FIGMA_BOTTOM_INSET = 34;

type OnboardingLayoutProps = {
  children: ReactNode;
  /** 0–1. Omit to hide the progress bar. */
  progress?: number;
  buttonLabel?: string;
  onPress?: () => void;
  /** Rendered under the CTA (e.g. terms copy). */
  footnote?: ReactNode;
  /** Rendered in place of the progress bar row (e.g. a close button). */
  topAccessory?: ReactNode;
  background?: keyof typeof backgrounds;
  contentStyle?: StyleProp<ViewStyle>;
};

/**
 * Blue money-pattern scaffold shared by every onboarding step:
 * background → optional progress bar → centered content → pinned CTA (+ footnote).
 */
export function OnboardingLayout({
  children,
  progress,
  buttonLabel = 'Next',
  onPress,
  footnote,
  topAccessory,
  background = 'default',
  contentStyle,
}: OnboardingLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <Image
        source={backgrounds[background]}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        contentPosition="top"
      />

      <View style={[styles.top, { paddingTop: insets.top + 6 }]}>
        {topAccessory}
        {progress !== undefined && <OnboardingProgress value={progress} />}
      </View>

      <View style={[styles.content, contentStyle]}>{children}</View>

      <View
        style={[
          styles.footer,
          { height: FOOTER_HEIGHT + Math.max(insets.bottom - FIGMA_BOTTOM_INSET, 0) },
        ]}>
        <PillButton label={buttonLabel} onPress={onPress} />
        {footnote}
      </View>
    </View>
  );
}

export function OnboardingProgress({ value }: { value: number }) {
  const clamped = Math.min(Math.max(value, 0), 1);
  return (
    <View style={styles.track} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}>
      <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Ui.white,
  },
  top: {
    paddingHorizontal: 37,
    minHeight: 11,
  },
  track: {
    height: 11,
    width: '100%',
    maxWidth: 365,
    alignSelf: 'center',
    borderRadius: 5.5,
    backgroundColor: Ui.onboardingProgressTrack,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    minWidth: 30,
    borderRadius: 5.5,
    backgroundColor: Ui.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
});
