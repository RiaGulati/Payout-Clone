/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

import { Palette } from '@/constants/colors';

export const Colors = {
  light: {
    text: Palette.neutral[9999],
    background: Palette.neutral[0],
    backgroundElement: Palette.neutral[100],
    backgroundSelected: Palette.neutral[200],
    textSecondary: Palette.neutral[600],
  },
  dark: {
    text: Palette.neutral[0],
    background: Palette.neutral[9999],
    backgroundElement: Palette.neutral[800],
    backgroundSelected: Palette.neutral[700],
    textSecondary: Palette.neutral[400],
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/** Figma "Corner/*" radii. */
export const Radius = {
  small: 8,
  medium: 12,
  large: 16,
  largeIncreased: 20,
  pill: 1000,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
