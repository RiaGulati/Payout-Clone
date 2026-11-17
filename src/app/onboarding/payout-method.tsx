// Figma: "Onboarding - 10" (111:317) — "How would you like to receive payouts?" single-select.
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingBody, OnboardingTitle } from '@/components/onboarding/onboarding-text';
import { Palette, Ui } from '@/constants/colors';
import { ONBOARDING_ROUTES } from '@/constants/onboarding';
import { Radius } from '@/constants/theme';
import { Typography } from '@/constants/typography';
import { saveOnboardingAnswers } from '@/lib/api';

const PAYOUT_METHODS = ['Credit Card', 'Debit Card', 'Prepaid Card', 'Zelle', 'Venmo'] as const;
type PayoutMethod = (typeof PAYOUT_METHODS)[number];

export default function PayoutMethodScreen() {
  const { brands } = useLocalSearchParams<{ brands?: string }>();
  const [method, setMethod] = useState<PayoutMethod | null>(null);

  const next = () => {
    // Save in the background so a slow connection never blocks the flow. If it fails, onboarding
    // simply shows again on the next launch.
    saveOnboardingAnswers({ brands: brands ? brands.split(',') : [], payoutMethod: method }).catch((error) =>
      console.warn('Failed to save onboarding answers:', error?.message ?? error),
    );
    router.push(ONBOARDING_ROUTES.estimating);
  };

  return (
    <OnboardingLayout
      background="welcome"
      progress={274 / 365}
      onPress={next}
      contentStyle={styles.content}>
      <View style={styles.topSpace} />
      <OnboardingTitle style={styles.title}>How would you like to receive payouts?</OnboardingTitle>
      <OnboardingBody style={styles.subtitle}>
        This will be set as the default payout method when claims are filled
      </OnboardingBody>

      <View style={styles.optionsSpace} />
      <View style={styles.options} accessibilityRole="radiogroup">
        {PAYOUT_METHODS.map((option) => {
          const selected = option === method;
          return (
            <Pressable
              key={option}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => setMethod(option)}
              style={({ pressed }) => [styles.option, selected && styles.optionSelected, pressed && styles.pressed]}>
              <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.bottomSpace} />
    </OnboardingLayout>
  );
}

// The 956pt Figma frame leaves 694pt between the progress bar and the CTA. Shorter phones (e.g. 852pt)
// have ~100pt less, so the gaps above the title and above the options are flexible spacers capped at
// their Figma sizes; they shrink in proportion and the options never run into the CTA.
const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
  },
  // Title is 2 lines × 32 centered at y190.5 → text top y158.5 (content starts at y73).
  topSpace: {
    flex: 85.5,
    maxHeight: 85.5,
  },
  // Options list top sits at y338.
  optionsSpace: {
    flex: 48,
    maxHeight: 48,
  },
  // Options end at y688, 79pt above the CTA (y767); keeps at least some of that gap on short screens.
  bottomSpace: {
    flex: 79,
    minHeight: 16,
  },
  title: {
    // Figma "ios-headline-medium": SF Regular 28/32.
    ...Typography.iosHeadlineMedium,
    fontStyle: 'normal',
    maxWidth: 323,
  },
  subtitle: {
    // Figma "ios-body-medium": SF Regular 14/20, tracking 0.25; 2 lines centered at y270 → top y250.
    ...Typography.iosBodyMedium,
    marginTop: 27.5,
    maxWidth: 260,
  },
  options: {
    width: 345,
    maxWidth: '100%',
    gap: 20,
  },
  option: {
    height: 54,
    borderRadius: Radius.large,
    borderWidth: 3,
    borderColor: Ui.primaryFixedDim,
    backgroundColor: Ui.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: Palette.purple[600],
    borderColor: Ui.white,
  },
  pressed: {
    opacity: 0.8,
  },
  optionLabel: {
    // SF Bold 16/24.
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: Ui.textPrimary,
    textAlign: 'center',
  },
  optionLabelSelected: {
    color: Ui.white,
  },
});
