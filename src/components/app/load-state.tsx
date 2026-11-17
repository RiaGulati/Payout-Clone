import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { Palette, Ui } from '@/constants/colors';
import { Radius } from '@/constants/theme';
import { Typography } from '@/constants/typography';

/** Centered spinner shown while a screen's data loads. Not in Figma. */
export function LoadingState() {
  return (
    <View style={styles.wrap} accessibilityRole="progressbar" accessibilityLabel="Loading">
      <ActivityIndicator size="large" color={Palette.purple[600]} />
    </View>
  );
}

type ErrorStateProps = {
  message?: string;
  onRetry: () => void;
  retryLabel?: string;
};

/** "Couldn't load" message with a retry button. Not in Figma. */
export function ErrorState({
  message = 'Couldn’t load this. Check your connection.',
  onRetry,
  retryLabel = 'Try again',
}: ErrorStateProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.message}>{message}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onRetry}
        hitSlop={8}
        style={({ pressed }) => [styles.retry, pressed && styles.pressed]}>
        <Text style={styles.retryLabel}>{retryLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
    gap: 16,
  },
  message: {
    ...Typography.iosBodyMedium,
    color: Ui.textMuted,
    textAlign: 'center',
  },
  retry: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    backgroundColor: Palette.purple[600],
  },
  retryLabel: {
    ...Typography.buttonMedium,
    color: Ui.white,
  },
  pressed: {
    opacity: 0.7,
  },
});
