import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

type AppHeaderProps = {
  title: string;
  /** Show the "mode" logo on the left (default true). */
  showLogo?: boolean;
  /** Custom left content; replaces the logo. */
  left?: ReactNode;
  /** Custom right content. Defaults to the round menu button when `onMenuPress` is set. */
  right?: ReactNode;
  onMenuPress?: () => void;
};

/**
 * White top bar from the in-app screens: mode logo · centered title · menu button.
 * Sits under the status bar on the light-grey app background.
 */
export function AppHeader({ title, showLogo = true, left, right, onMenuPress }: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  const rightContent =
    right ??
    (onMenuPress ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open menu"
        onPress={onMenuPress}
        hitSlop={8}
        style={({ pressed }) => pressed && styles.pressed}>
        <Image source={require('@/assets/images/icons/header-menu.svg')} style={styles.menu} />
      </Pressable>
    ) : null);

  return (
    <View style={[styles.safeTop, { paddingTop: insets.top + 12 }]}>
      <View style={styles.bar}>
        <View style={styles.side}>
          {left ??
            (showLogo && (
              <Image
                source={require('@/assets/images/brand/mode-logo.png')}
                style={styles.logo}
                contentFit="cover"
                accessibilityLabel="mode"
              />
            ))}
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={[styles.side, styles.sideRight]}>{rightContent}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeTop: {
    backgroundColor: Ui.appBackground,
  },
  bar: {
    backgroundColor: Ui.white,
    paddingHorizontal: 28,
    paddingVertical: 10,
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: `0px 0px 4px 0px ${Ui.shadowLight}`,
  },
  side: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideRight: {
    justifyContent: 'flex-end',
  },
  logo: {
    width: 68,
    // Figma's drop shadow follows the logo's alpha; a RN boxShadow would draw a grey box, so it's omitted.
    height: 28,
  },
  title: {
    ...Typography.navTitle,
    color: Ui.textPrimary,
    textAlign: 'center',
  },
  menu: {
    width: 35,
    height: 35,
  },
  pressed: {
    opacity: 0.7,
  },
});
