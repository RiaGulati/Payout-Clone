// Figma: "Onboarding - 6" (111:147) — no proof? still eligible.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingBody, OnboardingTitle } from '@/components/onboarding/onboarding-text';
import { Ui } from '@/constants/colors';
import { ONBOARDING_ROUTES } from '@/constants/onboarding';
import { Radius } from '@/constants/theme';
import { Typography } from '@/constants/typography';

export default function NoProofScreen() {
  return (
    <OnboardingLayout
      background="welcome"
      progress={153 / 365}
      onPress={() => router.push(ONBOARDING_ROUTES.average)}
      contentStyle={styles.content}>
      {/* Example settlement card (111:216) */}
      <View style={styles.card}>
        <View style={styles.logoTile}>
          <Image
            source={require('@/assets/images/brands/apple-white.png')}
            style={styles.logo}
            contentFit="cover"
            accessibilityLabel="Apple"
          />
        </View>
        <View style={styles.cardText}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>Apple</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>No Proof</Text>
            </View>
          </View>
          <Text style={styles.deadline}>Claim by Aug 10th 2025</Text>
        </View>
      </View>

      <OnboardingTitle style={styles.title}>{'No proof?\nStill eligible!'}</OnboardingTitle>
      <OnboardingBody style={styles.body}>
        You can still file a claim if you lost your receipt. If something requires proof, we’ll let
        you know before you file.
      </OnboardingBody>
    </OnboardingLayout>
  );
}

const CARD_BORDER = 3;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    // Card top sits at y280 in the 956pt frame.
    paddingTop: 207,
  },
  card: {
    width: 365,
    maxWidth: '100%',
    height: 136,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // Logo tile at x15 / y23 from the card's outer edge.
    paddingTop: 23 - CARD_BORDER,
    paddingLeft: 15 - CARD_BORDER,
    gap: 14,
    overflow: 'hidden',
    borderRadius: Radius.largeIncreased,
    borderWidth: CARD_BORDER,
    borderColor: Ui.primaryContainer,
    backgroundColor: Ui.primaryFixedDim,
  },
  logoTile: {
    width: 108,
    height: 83,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Ui.textMuted,
    backgroundColor: Ui.black,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 41,
    height: 49,
  },
  cardText: {
    flex: 1,
    // "Apple" line box top at y34 in the card (tile top is y23).
    marginTop: 11,
    gap: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  name: {
    // SF Pro Bold 28/24, tracking 0.5
    ...Typography.iosTitleLarge,
    fontSize: 28,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: Ui.white,
  },
  badge: {
    width: 75,
    height: 21,
    justifyContent: 'center',
    borderRadius: Radius.medium,
    backgroundColor: Ui.cardPurple,
  },
  badgeText: {
    // SF Pro Bold 12, tracking 0.5
    ...Typography.onboardingBody,
    fontSize: 12,
    lineHeight: 21,
    textAlign: 'center',
    color: Ui.white,
  },
  deadline: {
    // SF Pro Bold 16/24
    ...Typography.onboardingBody,
    lineHeight: 24,
    letterSpacing: 0,
    color: Ui.white,
  },
  title: {
    // Two 40pt lines centered at y521 → top y481.
    marginTop: 65,
    maxWidth: 343,
    fontSize: 30,
    lineHeight: 40,
  },
  body: {
    // Three 20pt lines centered at y622 → top y592.
    marginTop: 31,
    maxWidth: 348,
    lineHeight: 20,
  },
});
