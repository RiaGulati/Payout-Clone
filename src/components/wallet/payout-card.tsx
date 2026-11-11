import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Gradients, Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

type PayoutCardProps = {
  estimatedPayout: number;
  claimedCount: number;
  notifiedCount: number;
  onInfoPress: () => void;
};

/** Purple "Estimated Payout" summary card at the top of the Wallet tab. */
export function PayoutCard({ estimatedPayout, claimedCount, notifiedCount, onInfoPress }: PayoutCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Estimated Payout</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="How estimated payouts work"
          onPress={onInfoPress}
          hitSlop={10}
          style={({ pressed }) => [styles.info, pressed && styles.pressed]}>
          <Image source={require('@/assets/images/wallet/question-mark-circle.svg')} style={styles.infoIcon} />
        </Pressable>
      </View>
      <Text style={styles.amount}>${estimatedPayout.toLocaleString('en-US')}</Text>
      <View style={styles.stats}>
        <Stat label="# Claimed" value={claimedCount} />
        <Stat label="Notified" value={notifiedCount} />
      </View>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    paddingHorizontal: 29,
    paddingVertical: 25,
    gap: 24,
    overflow: 'hidden',
    experimental_backgroundImage: Gradients.purpleCard,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    ...Typography.iosHeadlineSmall,
    flex: 1,
    color: Ui.white,
  },
  info: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIcon: {
    width: 20.5,
    height: 20.5,
  },
  amount: {
    ...Typography.iosTitleLarge,
    color: Ui.white,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  stat: {
    gap: 6,
  },
  statLabel: {
    ...Typography.iosBodyLarge,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: Ui.onCardMuted,
  },
  statValue: {
    ...Typography.iosTitleLarge,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: Ui.white,
  },
  pressed: {
    opacity: 0.7,
  },
});
