// Figma: "Onboarding - 7" (111:197) — on a yearly average you are owed $397.
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingBody, OnboardingTitle } from '@/components/onboarding/onboarding-text';
import { Ui } from '@/constants/colors';
import { ONBOARDING_ROUTES } from '@/constants/onboarding';
import { Radius } from '@/constants/theme';
import { Typography } from '@/constants/typography';

export default function AverageScreen() {
  return (
    <OnboardingLayout
      background="welcome"
      progress={188 / 365}
      onPress={() => router.push(ONBOARDING_ROUTES.ranking)}
      contentStyle={styles.content}>
      <OnboardingBody style={styles.intro}>{'On a yearly average\nyou are owed'}</OnboardingBody>
      <OnboardingTitle style={styles.amount}>$397</OnboardingTitle>

      {/* Testimonial card (111:258) */}
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.headerText}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>John D.</Text>
              <Text style={styles.stars} accessibilityLabel="5 stars">
                ⭐️⭐⭐⭐⭐
              </Text>
            </View>
            <Text style={styles.claimed}>Claimed $41 last month</Text>
          </View>
        </View>
        <Text style={styles.quote}>“It’s like finding money on the ground every single week!”</Text>
      </View>
    </OnboardingLayout>
  );
}

const CARD_BORDER = 3;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    // Two 24pt intro lines centered at y297 → top y273.
    paddingTop: 200,
  },
  intro: {
    lineHeight: 24,
    maxWidth: 285,
  },
  amount: {
    // SF Pro Black Italic 96, tracking 1.5, centered at y398. Figma's line height is 40;
    // a 100pt line box keeps the glyphs unclipped with the same center.
    fontSize: 96,
    lineHeight: 100,
    letterSpacing: 1.5,
    maxWidth: 343,
    marginTop: 27,
    textShadowColor: Ui.shadowStrong,
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  card: {
    width: 345,
    maxWidth: '100%',
    height: 183,
    // Card top sits at y490.
    marginTop: 42,
    // Avatar at x16 / y21 from the card's outer edge; text column ends at x314.
    paddingTop: 21 - CARD_BORDER,
    paddingLeft: 16 - CARD_BORDER,
    paddingRight: 345 - 314 - CARD_BORDER,
    overflow: 'hidden',
    borderRadius: Radius.largeIncreased,
    borderWidth: CARD_BORDER,
    borderColor: Ui.primaryContainer,
    backgroundColor: Ui.cardPurple,
  },
  header: {
    flexDirection: 'row',
    gap: 8,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: Radius.pill,
    backgroundColor: Ui.white,
  },
  headerText: {
    flex: 1,
    marginTop: 2,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    // SF Pro Heavy 16/24, tracking 0.25
    ...Typography.iosBodyLarge,
    fontWeight: '800',
    letterSpacing: 0.25,
    color: Ui.white,
  },
  stars: {
    // SF Pro Regular 16/24, tracking 0.75
    ...Typography.iosBodyLarge,
    letterSpacing: 0.75,
    textAlign: 'right',
  },
  claimed: {
    // SF Pro Regular 16/24, tracking 0.25
    ...Typography.iosBodyLarge,
    letterSpacing: 0.25,
    color: Ui.white,
  },
  quote: {
    // SF Pro Bold 16/24, tracking 0.25; two lines centered at y124 in the card → top y100.
    ...Typography.iosBodyLarge,
    fontWeight: '700',
    letterSpacing: 0.25,
    color: Ui.white,
    width: 289,
    maxWidth: '100%',
    marginTop: 25,
    marginLeft: 9,
  },
});
