import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { FORM_STATUSES, type FormStatus } from '@/data/forms';

import { FormStatusColor } from './form-status';

type StatusFilterProps = {
  selected: FormStatus | null;
  onChange: (status: FormStatus | null) => void;
};

/**
 * Status legend (colored dot + label) that doubles as a single-select filter.
 * Tapping the active status again clears the filter (shows all forms).
 * Figma paints the "Case Closed" legend dot white; it uses the row's red so the legend reads.
 */
export function StatusFilter({ selected, onChange }: StatusFilterProps) {
  return (
    <View style={styles.row}>
      {FORM_STATUSES.map(({ value, label }) => {
        const active = selected === value;
        const dimmed = selected !== null && !active;
        return (
          <Pressable
            key={value}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`Filter by ${label}`}
            onPress={() => onChange(active ? null : value)}
            hitSlop={8}
            style={({ pressed }) => [styles.item, dimmed && styles.dimmed, pressed && styles.pressed]}>
            <View style={[styles.dot, { backgroundColor: FormStatusColor[value] }]} />
            <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  // Figma 314:1152: items 36pt apart, 15pt dot + 8pt gap + SF Semibold 15/28 label.
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: 36,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 28,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
  label: {
    ...Typography.legendLabel,
    color: Ui.textSubtle,
  },
  labelActive: {
    color: Ui.textPrimary,
  },
  dimmed: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.7,
  },
});
