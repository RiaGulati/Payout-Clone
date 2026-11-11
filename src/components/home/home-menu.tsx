import { Image, type ImageSource } from 'expo-image';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

export type HomeMenuItem = 'how-it-works' | 'privacy' | 'terms' | 'support';

// Figma icon sizes: info + question mark are 20pt, privacy + docs are 24pt (the question
// mark's glyph is 17.33pt inside its 20pt frame). All sit centered in a 24pt column.
const ITEMS: { key: HomeMenuItem; label: string; icon: ImageSource; size: number }[] = [
  { key: 'how-it-works', label: 'How does this work', icon: require('@/assets/images/home/info-circle.svg'), size: 20 },
  { key: 'privacy', label: 'Privacy Policy', icon: require('@/assets/images/home/privacy-tip.svg'), size: 24 },
  { key: 'terms', label: 'Terms of Use', icon: require('@/assets/images/home/document.svg'), size: 24 },
  { key: 'support', label: 'Contact Support', icon: require('@/assets/images/home/question-mark-circle.svg'), size: 17.3333 },
];

/** Header bar height in `AppHeader` (paddingTop insets.top + 12, bar 55). */
const HEADER_OFFSET = 12 + 55;

type HomeMenuProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (item: HomeMenuItem) => void;
};

/** "Home - 2" (136:949, popover 154:516): menu anchored under the header menu button, over a dimmed backdrop. */
export function HomeMenu({ visible, onClose, onSelect }: HomeMenuProps) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close menu" />
      {/* Popover top sits at y=134 in the 956pt frame (header bottom + 5). */}
      <View style={[styles.popover, { top: insets.top + HEADER_OFFSET + 5 }]}>
        {ITEMS.map(({ key, label, icon, size }) => (
          <Pressable
            key={key}
            accessibilityRole="menuitem"
            onPress={() => onSelect(key)}
            hitSlop={12}
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
            <View style={styles.iconSlot}>
              <Image source={icon} style={{ width: size, height: size }} />
            </View>
            <Text style={styles.label}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Ui.scrim,
  },
  popover: {
    position: 'absolute',
    right: 0,
    width: 238,
    paddingHorizontal: 19,
    // Rows are 24pt (icon column) on a 49pt pitch → 226pt tall, as in Figma.
    paddingVertical: 27.5,
    gap: 25,
    borderRadius: 14,
    backgroundColor: Ui.white,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pressed: {
    opacity: 0.5,
  },
  iconSlot: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...Typography.menuItem,
    color: Ui.menuText,
  },
});
