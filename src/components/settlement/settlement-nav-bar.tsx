import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

const BACK_CHEVRON = require('@/assets/images/settlement/back-chevron.svg');

/** Height of the nav row; its center lands at y≈83 in the 956pt frame (insets.top + 4 + 17). */
const NAV_ROW_HEIGHT = 34;

type SettlementNavBarProps = {
  title: string;
  onBack: () => void;
  onInfo: () => void;
};

/** Settlement Details (172:400) nav bar: "‹ Back" · centered title · "Info" pill. */
export function SettlementNavBar({ title, onBack, onInfo }: SettlementNavBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingTop: insets.top + 4 }]}>
      <View style={styles.side}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={onBack}
          hitSlop={10}
          style={({ pressed }) => [styles.back, pressed && styles.pressed]}>
          <Image source={BACK_CHEVRON} style={styles.chevron} />
          <Text style={styles.backLabel}>Back</Text>
        </Pressable>
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={[styles.side, styles.sideRight]}>
        <Pressable
          accessibilityRole="button"
          onPress={onInfo}
          hitSlop={8}
          style={({ pressed }) => [styles.info, pressed && styles.pressed]}>
          <Text style={styles.infoLabel}>Info</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Ui.white,
  },
  side: {
    flex: 1,
    height: NAV_ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideRight: {
    justifyContent: 'flex-end',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  chevron: {
    width: 14,
    height: 28,
  },
  backLabel: {
    ...Typography.navTitle,
    fontSize: 18,
    fontWeight: '500',
    color: Ui.iosLink,
  },
  title: {
    ...Typography.iosTitleMedium,
    color: Ui.textPrimary,
    textAlign: 'center',
  },
  // Figma 176:410: 13/10 padding around a 12pt line box → 32pt tall, 0.1pt black stroke.
  info: {
    height: 32,
    paddingHorizontal: 13,
    borderRadius: 22,
    borderWidth: 0.1,
    borderColor: Ui.black,
    backgroundColor: Ui.infoPill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: {
    ...Typography.caption,
    fontWeight: '500',
    color: Ui.iosLink,
  },
  pressed: {
    opacity: 0.6,
  },
});
