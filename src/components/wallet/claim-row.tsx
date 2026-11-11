import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import type { Claim } from '@/data/claims';

/** White claim card: brand logo · amount + due date · green "Claimed ✓" pill. */
export function ClaimRow({ claim }: { claim: Claim }) {
  const due = claim.dueInDays === 1 ? 'Due in 1 day' : `Due in ${claim.dueInDays} days`;

  return (
    <View style={styles.card}>
      <Image source={claim.logo} style={styles.logo} contentFit="cover" accessibilityLabel={claim.brand} />
      <View style={styles.text}>
        <Text style={styles.amount}>${claim.amount}</Text>
        <Text style={styles.due}>{due}</Text>
      </View>
      <View style={styles.pill}>
        <Text style={styles.pillLabel}>Claimed</Text>
        <Image source={require('@/assets/images/wallet/check-rounded.svg')} style={styles.check} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Ui.white,
    borderRadius: 20,
    paddingHorizontal: 17,
    paddingVertical: 16,
    boxShadow: `0px 0px 6px 0px ${Ui.shadowRow}`,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  text: {
    flex: 1,
    marginLeft: 14,
    gap: 6,
  },
  amount: {
    ...Typography.titleMedium,
    color: Ui.textPrimary,
  },
  due: {
    ...Typography.caption,
    color: Ui.textMuted,
  },
  pill: {
    width: 112,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingLeft: 18,
    paddingRight: 13,
    borderRadius: 5,
    backgroundColor: Ui.success,
  },
  pillLabel: {
    ...Typography.buttonMedium,
    lineHeight: 18,
    color: Ui.white,
  },
  check: {
    width: 20,
    height: 20,
  },
});
