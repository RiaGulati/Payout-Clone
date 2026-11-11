// Figma: "Onboarding - 14" (137:164) — one-time 50% discount offer that ends onboarding.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CloseButton } from '@/components/paywall/close-button';
import { PillButton } from '@/components/pill-button';
import { Palette, Ui } from '@/constants/colors';
import { APP_HOME_ROUTE } from '@/constants/onboarding';
import { Typography } from '@/constants/typography';

/** Home-indicator inset baked into the Figma frame. */
const FIGMA_BOTTOM_INSET = 34;

export default function OfferScreen() {
  const insets = useSafeAreaInsets();
  // Replace so Back can't return into onboarding.
  const finish = () => router.replace(APP_HOME_ROUTE);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          <Text>We want you to </Text>
          <Text style={styles.titleAccent}>make some money</Text>
        </Text>

        <Text style={styles.gift} accessibilityLabel="Gift">
          🎁
        </Text>

        <View style={styles.badge}>
          <Image
            source={require('@/assets/images/paywall/check.svg')}
            style={styles.check}
            contentFit="contain"
          />
          <Text style={styles.badgeLabel}>50% Discount Applied</Text>
        </View>

        <Text style={styles.body}>{'Use the app for\na discount with our\none time offer!'}</Text>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: 85 + Math.max(insets.bottom, FIGMA_BOTTOM_INSET) - FIGMA_BOTTOM_INSET },
        ]}>
        <PillButton label="Continue for 50% OFF" variant="purple" onPress={finish} style={styles.cta} />
      </View>

      <CloseButton
        variant="onLight"
        onPress={finish}
        style={[styles.close, { top: insets.top + 8 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Ui.white,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
    // Title top sits at y151 in the 956pt frame (89pt below the safe area).
    paddingTop: 89,
    paddingBottom: 24,
  },
  close: {
    position: 'absolute',
    right: 34,
  },
  title: {
    ...Typography.offerTitle,
    color: Ui.black,
    textAlign: 'center',
    maxWidth: 343,
  },
  titleAccent: {
    color: Palette.purple[600],
  },
  gift: {
    fontSize: 180,
    lineHeight: 200,
    textAlign: 'center',
    marginTop: 28,
  },
  badge: {
    width: 265,
    height: 43,
    marginTop: 40,
    borderRadius: 50,
    backgroundColor: Palette.purple[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    position: 'absolute',
    left: 15,
    top: 12,
    width: 20,
    height: 20,
  },
  badgeLabel: {
    ...Typography.offerBadge,
    color: Ui.white,
    textAlign: 'center',
    // Figma centers the label at x142 of the 265pt pill (9.5pt right of center).
    marginLeft: 19,
  },
  body: {
    ...Typography.offerBody,
    color: Ui.black,
    textAlign: 'center',
    maxWidth: 348,
    marginTop: 50,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  cta: {
    width: 366,
  },
});
