import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Palette, Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

type PillButtonProps = {
  label: string;
  onPress?: () => void;
  /** `light`: white pill with purple label (onboarding). `purple`: purple pill with white label. */
  variant?: 'light' | 'purple';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Large rounded CTA used across onboarding ("Next", "Get Started", "Continue"). */
export function PillButton({ label, onPress, variant = 'light', disabled, style }: PillButtonProps) {
  const isPurple = variant === 'purple';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isPurple ? styles.purple : styles.light,
        (pressed || disabled) && styles.pressed,
        style,
      ]}>
      <Text style={[styles.label, { color: isPurple ? Ui.white : Palette.purple[600] }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 297,
    maxWidth: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 19,
    borderRadius: 50,
  },
  light: {
    backgroundColor: Ui.white,
  },
  purple: {
    backgroundColor: Palette.purple[600],
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    ...Typography.buttonLarge,
    textAlign: 'center',
  },
});
