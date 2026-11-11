import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { CloseButton } from '@/components/paywall/close-button';
import { PaywallLogoCluster } from '@/components/paywall/paywall-logo-cluster';
import { PlanCard, type Plan } from '@/components/paywall/plan-card';
import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

const PLANS: Plan[] = [
  { id: 'weekly', name: 'Weekly Unlimited', price: '$9.99', tagline: 'Perfect for trying it out', period: 'Weekly' },
  {
    id: 'yearly',
    name: 'Yearly Unlimited',
    price: '$39.99',
    tagline: 'Make the most money',
    period: 'Yearly',
    dimTagline: true,
  },
];

/** The design highlights the yearly card (brighter fill). */
const DEFAULT_PLAN = 'yearly';

const LINKS = ['Terms', 'Privacy', 'Restore'] as const;

type PaywallScreenProps = {
  onClose: () => void;
  /** Called with the selected plan id. */
  onContinue: (planId: string) => void;
};

/**
 * "$1B in settlements" subscription paywall, shared by the onboarding paywall
 * (Onboarding - 15, 137:245) and the in-app upgrade modal (Onboarding - 16, 314:595).
 * The two Figma frames are identical.
 */
export function PaywallScreen({ onClose, onContinue }: PaywallScreenProps) {
  const [selected, setSelected] = useState<string>(DEFAULT_PLAN);

  return (
    <OnboardingLayout
      buttonLabel="Continue"
      onPress={() => onContinue(selected)}
      topAccessory={
        <View style={styles.closeAnchor}>
          <CloseButton onPress={onClose} style={styles.close} />
        </View>
      }
      footnote={
        <View style={styles.links}>
          {LINKS.map((label) => (
            // Frontend only: legal pages / restore purchases are not wired up yet.
            <Pressable key={label} accessibilityRole="link" hitSlop={8} style={styles.link}>
              <Text style={styles.linkText}>{label}</Text>
            </Pressable>
          ))}
        </View>
      }
      contentStyle={styles.content}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <PaywallLogoCluster />
        <Text style={styles.title}>$1B in settlements coming this year</Text>
        <Text style={styles.body}>
          Gain Access to Unlimited Settlements! ModeMobile is the easiest way to get loads of cash
          with little effort
        </Text>
        <View style={styles.plans} accessibilityRole="radiogroup">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={plan.id === selected}
              onPress={() => setSelected(plan.id)}
            />
          ))}
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  // OnboardingLayout's top row starts at safe-area top + 6 with 37pt side padding;
  // the X sits at x25 / (safe-area top − 8) in Figma, so nudge it out of that box.
  closeAnchor: {
    height: 0,
  },
  close: {
    position: 'absolute',
    left: -12,
    top: -14,
  },
  content: {
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
  },
  scroll: {
    alignSelf: 'stretch',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    // Logo cluster top sits at y120 in the 956pt frame (~41pt below the top row).
    paddingTop: 41,
    paddingBottom: 16,
  },
  title: {
    ...Typography.paywallTitle,
    color: Ui.white,
    textAlign: 'center',
    maxWidth: 343,
    marginTop: 46,
    textShadowColor: Ui.paywallTitleShadow,
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 4,
  },
  body: {
    ...Typography.onboardingBody,
    lineHeight: 20,
    color: Ui.white,
    textAlign: 'center',
    maxWidth: 348,
    marginTop: 24,
  },
  plans: {
    width: '100%',
    maxWidth: 365,
    gap: 14,
    marginTop: 30,
  },
  links: {
    // Links are centered at y907.5 (CTA bottom at 829).
    marginTop: 50,
    width: 316,
    maxWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    width: 80,
    alignItems: 'center',
  },
  linkText: {
    ...Typography.labelMedium,
    lineHeight: 24,
    color: Ui.white,
    textDecorationLine: 'underline',
  },
});
