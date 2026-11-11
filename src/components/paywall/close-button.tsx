import { Image } from 'expo-image';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { Ui } from '@/constants/colors';

type CloseButtonProps = {
  onPress?: () => void;
  /** `onDark`: 20% white circle + white X. `onLight`: 20% grey circle + grey X. */
  variant?: 'onDark' | 'onLight';
  style?: StyleProp<ViewStyle>;
};

/**
 * 33pt circular close (X) button used on the paywall and offer screens.
 * Figma: "Frame 61" (137:335) on Onboarding - 15 and "Frame 62" (167:62) on Onboarding - 14,
 * each holding the 25pt "X" icon (stroke 4) inset 4pt.
 */
export function CloseButton({ onPress, variant = 'onDark', style }: CloseButtonProps) {
  const onDark = variant === 'onDark';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Close"
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: onDark ? Ui.closeButtonOnDark : Ui.closeButtonOnLight },
        pressed && styles.pressed,
        style,
      ]}>
      <Image
        source={require('@/assets/images/icons/close-x-white.svg')}
        tintColor={onDark ? Ui.white : Ui.closeIconOnLight}
        style={styles.icon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  pressed: {
    opacity: 0.6,
  },
});
