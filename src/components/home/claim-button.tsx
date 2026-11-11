import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Palette, Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

/** Small purple "Claim" button used on settlement cards and rows. */
export function ClaimButton({ onPress, style }: { onPress: () => void; style?: StyleProp<ViewStyle> }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Claim"
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}>
      <Text style={styles.label}>Claim</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 35,
    paddingHorizontal: 14,
    borderRadius: 5,
    backgroundColor: Palette.purple[700],
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  label: {
    ...Typography.buttonMedium,
    color: Ui.white,
  },
});
