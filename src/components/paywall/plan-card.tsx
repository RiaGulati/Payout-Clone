import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Ui } from '@/constants/colors';
import { Radius } from '@/constants/theme';
import { Typography } from '@/constants/typography';

export type Plan = {
  id: string;
  name: string;
  price: string;
  tagline: string;
  period: string;
  /** Figma renders this plan's tagline row at 60% opacity. */
  dimTagline?: boolean;
};

type PlanCardProps = {
  plan: Plan;
  selected: boolean;
  onPress: () => void;
};

/** Frosted, outlined subscription option on the paywall. Selected = brighter fill. */
export function PlanCard({ plan, selected, onPress }: PlanCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${plan.name}, ${plan.price} ${plan.period}`}
      onPress={onPress}
      style={[styles.card, selected && styles.selected]}>
      <View style={styles.row}>
        <Text style={styles.title} numberOfLines={1}>
          {plan.name}
        </Text>
        <Text style={styles.title}>{plan.price}</Text>
      </View>
      <View style={[styles.row, plan.dimTagline && styles.dim]}>
        <Text style={styles.body} numberOfLines={1}>
          {plan.tagline}
        </Text>
        <Text style={styles.body}>{plan.period}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: Radius.large,
    borderWidth: 3,
    borderColor: Ui.paywallCardBorder,
    backgroundColor: Ui.paywallCard,
  },
  selected: {
    backgroundColor: Ui.paywallCardSelected,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    minHeight: 28,
  },
  dim: {
    opacity: 0.6,
  },
  title: {
    ...Typography.iosTitleMedium,
    color: Ui.white,
    flexShrink: 1,
  },
  body: {
    ...Typography.iosBodyLarge,
    color: Ui.white,
    flexShrink: 1,
  },
});
