import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { CATEGORY_FILTERS, type CategoryFilter } from '@/data/settlements';

type CategoryChipsProps = {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
};

/** Horizontally scrolling single-select category filter. */
export function CategoryChips({ value, onChange }: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      {CATEGORY_FILTERS.map(({ key, label }) => {
        const selected = key === value;
        return (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(key)}
            style={[styles.chip, selected && styles.chipSelected]}>
            <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 6,
    paddingLeft: 21,
    paddingRight: 20,
  },
  chip: {
    height: 41,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Ui.chipBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: {
    paddingHorizontal: 18,
    backgroundColor: Ui.chipSelected,
  },
  label: {
    ...Typography.bodyLarge,
    color: Ui.textMuted,
    textAlign: 'center',
  },
  labelSelected: {
    color: Ui.white,
  },
});
