import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import type { SettlementBadge as BadgeKind } from '@/data/settlements';

const CHECK = require('@/assets/images/icons/check-green.svg');
const STAR = require('@/assets/images/icons/star-gold.svg');

type SettlementBadgeProps = {
  kind: BadgeKind;
  /** `small`: list rows (23pt). `large`: settlement details (34pt). */
  size?: 'small' | 'large';
};

/** Pill badge ("No proof ✓" / "Uncapped ★") shown next to a settlement amount. */
export function SettlementBadge({ kind, size = 'small' }: SettlementBadgeProps) {
  const noProof = kind === 'no-proof';
  const large = size === 'large';
  const iconSize = large ? 16 : noProof ? 11 : 14;
  return (
    <View style={[styles.pill, large && styles.pillLarge, noProof ? styles.noProof : styles.uncapped]}>
      <Text
        style={[
          styles.label,
          large && styles.labelLarge,
          { color: noProof ? Ui.noProofText : Ui.uncappedText },
        ]}>
        {noProof ? 'No proof' : 'Uncapped'}
      </Text>
      <Image source={noProof ? CHECK : STAR} style={{ width: iconSize, height: iconSize }} />
    </View>
  );
}

/** Round icon-only badge (legend + featured cards). */
export function SettlementBadgeIcon({ kind, size = 23 }: { kind: BadgeKind; size?: number }) {
  const noProof = kind === 'no-proof';
  const iconSize = noProof ? Math.round(size * 0.56) : Math.round(size * 0.65);
  return (
    <View
      style={[
        styles.circle,
        noProof ? styles.noProof : styles.uncapped,
        { width: size, height: size, borderRadius: size / 2 },
      ]}>
      <Image source={noProof ? CHECK : STAR} style={{ width: iconSize, height: iconSize }} />
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    height: 23,
    paddingHorizontal: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  pillLarge: {
    height: 34,
    paddingHorizontal: 19.5,
    borderRadius: 17,
  },
  noProof: {
    backgroundColor: Ui.noProofBackground,
  },
  uncapped: {
    backgroundColor: Ui.uncappedBackground,
  },
  label: {
    ...Typography.chipLabel,
  },
  labelLarge: {
    ...Typography.buttonMedium,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
