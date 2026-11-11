// Figma: "Onboarding - 5" (111:100) — we find and track everything for you.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingBody, OnboardingTitle } from '@/components/onboarding/onboarding-text';
import { Ui } from '@/constants/colors';
import { ONBOARDING_ROUTES } from '@/constants/onboarding';
import { Radius } from '@/constants/theme';
import { Typography } from '@/constants/typography';

function AppIcon({ size }: { size: number }) {
  return (
    <View style={[styles.appIcon, { width: size, height: size }]}>
      <Image
        source={require('@/assets/images/brand/mode-logo.png')}
        style={styles.appIconLogo}
        contentFit="contain"
      />
    </View>
  );
}

export default function TrackingScreen() {
  return (
    <OnboardingLayout
      background="welcome"
      progress={128 / 365}
      onPress={() => router.push(ONBOARDING_ROUTES.noProof)}
      contentStyle={styles.content}>
      <Text style={styles.emoji} accessibilityLabel="Bell">
        🔔
      </Text>

      <View style={styles.notifications}>
        {/* Back notification (Frame 31): narrower, peeks out below the front one. */}
        <View style={[styles.card, styles.backCard]}>
          <AppIcon size={51} />
          <Text style={styles.backText}>You just got paid $35</Text>
        </View>
        {/* Front notification (Frame 30). */}
        <View style={[styles.card, styles.frontCard]}>
          <AppIcon size={54} />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>New $10 Claim!</Text>
            <Text style={styles.cardBody}>We’re holding your spot</Text>
          </View>
          <Text style={styles.time}>9:31 AM</Text>
        </View>
      </View>

      <OnboardingTitle style={styles.title}>We find and track everything for you</OnboardingTitle>
      <OnboardingBody style={styles.body}>
        When a new settlement opens, we’ll let you know. If you’re eligible, you can use ModeMobile
        for easy filing and skip the headache
      </OnboardingBody>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    // Bell glyph is centered at y≈253 in the 956pt frame.
    paddingTop: 130,
  },
  emoji: {
    fontSize: 100,
    lineHeight: 110,
  },
  notifications: {
    width: 365,
    maxWidth: '100%',
    height: 111, // front card (75) + back card peeking out (y373 + 70 − y332)
    marginTop: 19,
  },
  card: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Ui.white,
    borderRadius: Radius.large,
    boxShadow: `0px 4px 4px 0px ${Ui.shadowStrong}`,
  },
  frontCard: {
    top: 0,
    left: 0,
    right: 0,
    height: 75,
    paddingHorizontal: 15,
    gap: 13,
  },
  backCard: {
    top: 41,
    left: 31,
    right: 31,
    height: 70,
    paddingHorizontal: 12,
    gap: 6,
  },
  appIcon: {
    borderRadius: Radius.small,
    backgroundColor: Ui.notificationIcon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIconLogo: {
    width: 44,
    height: 18,
  },
  cardText: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    // SF Pro Heavy 16/24
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: Ui.textPrimary,
  },
  cardBody: {
    ...Typography.iosBodyLarge,
    letterSpacing: 0,
    color: Ui.textPrimary,
  },
  time: {
    fontSize: 14,
    lineHeight: 24,
    color: Ui.textMuted,
    position: 'absolute',
    top: 5,
    right: 21,
  },
  backText: {
    fontSize: 14,
    lineHeight: 24,
    color: Ui.textPrimary,
    // The back card's text sits on its lower half (center y=48 of 70), below the front card.
    marginTop: 26,
  },
  title: {
    marginTop: 38,
    maxWidth: 343,
    fontSize: 30,
    lineHeight: 40,
  },
  body: {
    marginTop: 21,
    maxWidth: 348,
    lineHeight: 20,
  },
});
