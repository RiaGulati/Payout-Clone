import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Palette, Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

const SEND = require('@/assets/images/settlement/send.svg');

type SettlementActionsProps = {
  onShare: () => void;
  onGetStarted: () => void;
};

/** Settlement Details (172:400, panel 176:467): "Tell your friends" (secondary) and "Get Started" (primary). */
export function SettlementActions({ onShare, onGetStarted }: SettlementActionsProps) {
  const insets = useSafeAreaInsets();
  return (
    // Panel is 211pt tall in the frame: 22 top + 56 + 7 + 56 + 70 bottom (34pt home indicator + 36).
    <View style={[styles.panel, { paddingBottom: Math.max(insets.bottom, 16) + 36 }]}>
      <Pressable
        accessibilityRole="button"
        onPress={onShare}
        style={({ pressed }) => [styles.button, styles.secondary, pressed && styles.pressed]}>
        <Text style={[styles.label, styles.secondaryLabel]}>Tell your friends</Text>
        <Image source={SEND} style={styles.send} />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={onGetStarted}
        style={({ pressed }) => [styles.button, styles.primary, pressed && styles.pressed]}>
        <Text style={[styles.label, styles.primaryLabel]}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    paddingHorizontal: 25,
    paddingTop: 22,
    gap: 7,
    backgroundColor: Ui.white,
    boxShadow: `0px -2px 13px 0px ${Ui.shadowStrong}`,
  },
  button: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },
  // Figma 176:459 left-aligns a 145pt label box at x=123 inside the button, then the icon.
  secondary: {
    paddingLeft: 123,
    gap: 9,
    backgroundColor: Ui.menuButtonBackground,
  },
  primary: {
    justifyContent: 'center',
    backgroundColor: Palette.purple[600],
  },
  pressed: {
    opacity: 0.75,
  },
  label: {
    ...Typography.navTitle,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryLabel: {
    minWidth: 145,
    color: Ui.textPrimary,
  },
  primaryLabel: {
    fontSize: 19,
    color: Ui.white,
  },
  send: {
    width: 18.0002,
    height: 18,
  },
});
