import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ClaimButton } from '@/components/home/claim-button';
import { SettlementBadgeIcon } from '@/components/home/settlement-badge';
import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { formatDue, type Settlement } from '@/data/settlements';

type FeaturedCardProps = {
  settlement: Settlement;
  onPress: () => void;
};

/** "Featured" carousel card with a claims-filled progress bar. */
export function FeaturedCard({ settlement, onPress }: FeaturedCardProps) {
  const filled = settlement.claimsFilled ?? 0;
  const total = settlement.claimsTotal ?? 0;
  const progress = total > 0 ? Math.min(filled / total, 1) : 0;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${settlement.amount}, ${formatDue(settlement.daysLeft)}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.top}>
        <View style={styles.info}>
          <Image source={settlement.thumbnail} style={styles.thumb} contentFit="cover" />
          <View style={styles.texts}>
            <View style={styles.amountRow}>
              <Text style={styles.amount}>{settlement.amount}</Text>
              {settlement.badge && <SettlementBadgeIcon kind={settlement.badge} size={25} />}
            </View>
            <Text style={styles.due}>{formatDue(settlement.daysLeft)}</Text>
          </View>
        </View>
        <ClaimButton onPress={onPress} style={styles.claim} />
      </View>
      {total > 0 && (
        <View style={styles.progressBlock}>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressLabel}>
            {filled} out of {total} claims filled 🎉
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 375,
    height: 132,
    paddingHorizontal: 21,
    paddingTop: 22,
    borderRadius: 15,
    backgroundColor: Ui.white,
    boxShadow: `0px 0px 4px 1px ${Ui.shadowCard}`,
    gap: 17,
  },
  pressed: {
    opacity: 0.85,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    flexShrink: 1,
  },
  thumb: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  texts: {
    gap: 4,
    flexShrink: 1,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amount: {
    ...Typography.iosTitleLarge,
    color: Ui.textPrimary,
  },
  due: {
    ...Typography.caption,
    color: Ui.textMuted,
  },
  claim: {
    width: 88,
  },
  progressBlock: {
    gap: 7,
  },
  track: {
    height: 7,
    borderRadius: 16,
    backgroundColor: Ui.progressTrack,
    overflow: 'hidden',
  },
  fill: {
    height: 7,
    borderRadius: 16,
    backgroundColor: Ui.claimPurple,
  },
  progressLabel: {
    ...Typography.bodySmall,
    color: Ui.textMuted,
  },
});
