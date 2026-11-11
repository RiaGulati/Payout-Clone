import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ClaimButton } from '@/components/home/claim-button';
import { SettlementBadge } from '@/components/home/settlement-badge';
import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { formatDue, type Settlement } from '@/data/settlements';

type SettlementRowProps = {
  settlement: Settlement;
  onPress: () => void;
};

/** White list row: thumbnail · amount + badge / due date · Claim. */
export function SettlementRow({ settlement, onPress }: SettlementRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${settlement.amount}, ${formatDue(settlement.daysLeft)}`}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <Image source={settlement.thumbnail} style={styles.thumb} contentFit="cover" />
      <View style={styles.texts}>
        <View style={styles.amountRow}>
          <Text style={styles.amount}>{settlement.amount}</Text>
          {settlement.badge && <SettlementBadge kind={settlement.badge} />}
        </View>
        <Text style={styles.due}>{formatDue(settlement.daysLeft)}</Text>
      </View>
      <ClaimButton onPress={onPress} style={styles.claim} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 79,
    paddingLeft: 19,
    paddingRight: 19,
    borderRadius: 15,
    backgroundColor: Ui.white,
    boxShadow: `0px 4px 4px 0px ${Ui.shadowSoft}`,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  pressed: {
    opacity: 0.85,
  },
  thumb: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  amount: {
    ...Typography.iosTitleMedium,
    color: Ui.textPrimary,
  },
  due: {
    ...Typography.caption,
    color: Ui.textMuted,
  },
  claim: {
    width: 78,
    height: 34,
  },
});
