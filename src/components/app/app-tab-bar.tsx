import { Image } from 'expo-image';
import type { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

/** Icon assets + their Figma sizes. Wallet icon has -3 bottom margin in Figma. */
const TAB_ITEMS: Record<
  string,
  { label: string; icon: number; width: number; height: number; iconOffset?: number }
> = {
  home: { label: 'Home', icon: require('@/assets/images/icons/tab-home.svg'), width: 30, height: 30 },
  wallet: {
    label: 'Wallet',
    icon: require('@/assets/images/icons/tab-wallet.svg'),
    width: 39,
    height: 39,
    iconOffset: -3,
  },
  forms: { label: 'Forms', icon: require('@/assets/images/icons/tab-forms.svg'), width: 31, height: 32 },
};

/** Bottom navbar from the Figma "navbar" component (Home / Wallet / Forms). */
export function AppTabBar({ state, emitter, navigateToTab }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.menu}>
        {state.routes.map((route, index) => {
          const item = TAB_ITEMS[route.name];
          if (!item) return null;
          const focused = state.index === index;
          const color = focused ? Ui.black : Ui.tabInactive;

          const onPress = () => {
            const event = emitter.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigateToTab(route.key);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={item.label}
              onPress={onPress}
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
              <Image
                source={item.icon}
                tintColor={color}
                style={{
                  width: item.width,
                  height: item.height,
                  marginBottom: item.iconOffset ?? 1.6,
                }}
              />
              <Text style={[styles.label, { color }]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: Ui.white,
    borderTopWidth: 0.3,
    borderTopColor: Ui.tabBarBorder,
    boxShadow: `0px -3px 4px -1px ${Ui.shadowTabBar}`,
  },
  menu: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 43,
  },
  item: {
    width: 98,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    ...Typography.tabLabel,
  },
});
