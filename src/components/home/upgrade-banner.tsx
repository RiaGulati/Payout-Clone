import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Gradients, Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

/** Purple "Unlimited Claims" membership banner with an Upgrade button. */
export function UpgradeBanner({ onUpgrade }: { onUpgrade: () => void }) {
  return (
    <View style={styles.banner}>
      <View style={styles.texts}>
        <Text style={styles.title}>Unlimited Claims</Text>
        <Text style={styles.subtitle}>Become a member for only $9.99</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={onUpgrade}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonLabel}>Upgrade</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    paddingHorizontal: 22,
    paddingVertical: 29,
    borderRadius: 15,
    experimental_backgroundImage: Gradients.purpleCard,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  texts: {
    width: 196,
    flexShrink: 1,
    gap: 10,
  },
  title: {
    ...Typography.iosTitleMedium,
    lineHeight: 22,
    letterSpacing: 0,
    color: Ui.white,
  },
  subtitle: {
    ...Typography.buttonMedium,
    lineHeight: 18,
    color: Ui.white,
  },
  button: {
    width: 97,
    padding: 8,
    borderRadius: 5,
    backgroundColor: Ui.white,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  buttonLabel: {
    ...Typography.buttonMedium,
    color: Ui.m3Primary,
    textAlign: 'center',
  },
});
