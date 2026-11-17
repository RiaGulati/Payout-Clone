// Figma: "Onboarding - 9" (111:269) — "Which brands have you purchased from…" multi-select grid.
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingBody, OnboardingTitle } from '@/components/onboarding/onboarding-text';
import { Palette, Ui } from '@/constants/colors';
import { ONBOARDING_ROUTES } from '@/constants/onboarding';
import { Radius } from '@/constants/theme';
import { Typography } from '@/constants/typography';

/**
 * The mockup shows 8 placeholder tiles (4 rows × 2); real brand logos are TBD. The selected ids are
 * saved to `profiles.brands`, so once real logos land, use each brand's `settlements.brand_key` as its id.
 */
const BRANDS = Array.from({ length: 8 }, (_, i) => ({ id: `brand-${i + 1}`, label: 'Insert Logo Here' }));

export default function BrandsScreen() {
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <OnboardingLayout
      background="welcome"
      progress={222 / 365}
      onPress={() =>
        router.push({ pathname: ONBOARDING_ROUTES.payoutMethod, params: { brands: [...selected].join(',') } })
      }
      contentStyle={styles.content}>
      <OnboardingTitle style={styles.title}>
        {'Which brands have\nyou purchased from in the past 5 years?'}
      </OnboardingTitle>
      <OnboardingBody style={styles.subtitle}>Pick the ones you haven’t claimed money from yet</OnboardingBody>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}>
        {BRANDS.map((brand) => (
          <BrandTile
            key={brand.id}
            label={brand.label}
            selected={selected.has(brand.id)}
            onPress={() => toggle(brand.id)}
          />
        ))}
      </ScrollView>
    </OnboardingLayout>
  );
}

function BrandTile({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.tile, selected && styles.tileSelected, pressed && styles.pressed]}>
      <Text style={[styles.tileLabel, selected && styles.tileLabelSelected]}>{label}</Text>
      {selected && (
        <View style={styles.badge}>
          <Text style={styles.badgeMark}>✓</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    // Three 32pt title lines centered at y190.5 → top y142.5.
    paddingTop: 70,
  },
  title: {
    // Figma "ios-headline-medium": SF Regular 28/32.
    ...Typography.iosHeadlineMedium,
    fontStyle: 'normal',
    maxWidth: 323,
  },
  subtitle: {
    // Figma "ios-body-medium": two 20pt lines centered at y270 → top y250.
    ...Typography.iosBodyMedium,
    marginTop: 11,
    maxWidth: 221,
  },
  scroll: {
    flex: 1,
    alignSelf: 'stretch',
    // Grid starts at y313 and its visible area ends 30pt above the CTA (y737).
    marginTop: 23,
    marginBottom: 30,
  },
  grid: {
    width: 275,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 25,
    rowGap: 16,
  },
  tile: {
    width: 125,
    height: 109,
    borderRadius: Radius.medium,
    borderWidth: 3,
    borderColor: Ui.transparent,
    backgroundColor: Ui.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileSelected: {
    borderColor: Palette.purple[600],
  },
  pressed: {
    opacity: 0.8,
  },
  tileLabel: {
    ...Typography.onboardingBody,
    width: 83,
    textAlign: 'center',
    color: Ui.textPrimary,
  },
  tileLabelSelected: {
    color: Palette.purple[600],
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Palette.purple[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeMark: {
    ...Typography.chipLabel,
    color: Ui.white,
  },
});
