/**
 * MDB Mode design-system colors.
 *
 * This is the ONLY file that should contain raw color values (hex / rgba).
 * Everywhere else, reference `Palette.*`, `Brand.*`, or `Ui.*`.
 *
 * Shades marked "-" in the Figma palette (no value defined) are intentionally omitted.
 */

export const Palette = {
  pink: {
    200: '#FE86B3',
    300: '#FE4F94',
    400: '#FD007C',
    500: '#FC0061',
    600: '#EB005F',
    700: '#D5005B',
  },
  purple: {
    300: '#B26DEB',
    400: '#A04DE5',
    500: '#8E2EDF',
    600: '#7E2DD8',
    700: '#642AD0',
    800: '#4A27C9',
  },
  blue: {
    200: '#71DEFE',
    300: '#00D0FF',
    400: '#00C5FF',
    500: '#00BAFF',
    600: '#00ABF6',
    700: '#0098E3',
  },
  gold: {
    400: '#FBED4A',
    500: '#F8E81F',
    600: '#FFDD25',
    700: '#FFC41B',
    800: '#FFAD10',
    900: '#FD8000',
  },
  red: {
    400: '#FF5535',
    500: '#FF220C',
    600: '#FF1807',
    700: '#FD0400',
    800: '#EF0000',
    900: '#D80000',
  },
  green: {
    300: '#9EF876',
    400: '#80F450',
    500: '#62F01F',
    600: '#4DDE14',
    700: '#29C800',
    800: '#00B400',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#FBF9FE',
    100: '#F6F3F9',
    200: '#EEECF1',
    300: '#E0DEE3',
    400: '#BCBABF',
    500: '#9D9BA0',
    600: '#555970',
    700: '#2A3155',
    800: '#1C2037',
    // Figma swatch fill (its label reads "#201F", a typo in the design file).
    900: '#110D1B',
    1000: '#090909',
    9999: '#000000',
  },
} as const;

/**
 * Semantic roles from the palette. The base shade for each role is the swatch
 * outlined in the Figma palette.
 */
export const Brand = {
  primary: Palette.pink[400],
  secondary: Palette.purple[500],
  tertiary: Palette.blue[300],
  accent: Palette.gold[800],
  error: Palette.red[700],
  complementary: Palette.green[500],
  base: Palette.neutral[200],
} as const;

/**
 * UI colors used by the MDB Mode Mobile screens that are not part of the
 * base palette (Figma local variables and one-off fills used in the mockups).
 * Group by meaning, not by screen.
 */
export const Ui = {
  white: Palette.neutral[0],
  black: Palette.neutral[9999],
  transparent: 'transparent',

  // Surfaces
  appBackground: '#F7F9F8',
  surface: Palette.neutral[0],
  menuButtonBackground: '#E7ECEE',

  // Text
  textPrimary: Palette.neutral[9999],
  textMuted: '#6C757E',
  textSubtle: 'rgba(0, 0, 0, 0.46)',
  tabInactive: '#7D7D7D',
  onSurface: Palette.neutral[900],
  onSurfaceVariant: '#2C3048',
  onDarkGradient: '#F3F5FF',

  // Lines & tracks
  tabBarBorder: '#848484',
  outline: '#D5D8E7',
  progressTrack: '#EFEFEF',
  onboardingProgressTrack: 'rgba(217, 217, 217, 0.5)',

  // Accents
  claimPurple: '#5129CB',
  m3Primary: '#6750A4',
  /** M3 secondary-container: circular progress track (Onboarding - 11). */
  m3SecondaryContainer: '#E8DEF8',
  /** Unselected answer-option border (Figma #D0BCFF, Onboarding - 10). */
  success: '#00B451',

  // Status chips
  chipBackground: 'rgba(232, 236, 239, 0.54)',
  chipSelected: '#6C757E',
  noProofBackground: '#E4F6E7',
  noProofText: '#00AA34',
  uncappedBackground: '#FFF3C7',
  uncappedText: '#C18300',

  // Shadows (used in boxShadow strings)
  shadowSoft: 'rgba(0, 0, 0, 0.02)',
  shadowLight: 'rgba(0, 0, 0, 0.09)',
  shadowCard: 'rgba(0, 0, 0, 0.1)',
  shadowTabBar: 'rgba(0, 0, 0, 0.11)',
  shadowStrong: 'rgba(0, 0, 0, 0.25)',

  // Paywall / offer
  paywallTitleShadow: '#236AC4',
  paywallCard: 'rgba(255, 255, 255, 0.1)',
  paywallCardSelected: 'rgba(255, 255, 255, 0.3)',
  paywallCardBorder: 'rgba(255, 255, 255, 0.5)',
  closeButtonOnDark: 'rgba(255, 255, 255, 0.2)',
  closeButtonOnLight: 'rgba(125, 125, 125, 0.2)',
  closeIconOnLight: '#848484',

  // Wallet / Forms
  onCardMuted: 'rgba(255, 255, 255, 0.72)',
  shadowRow: 'rgba(0, 0, 0, 0.08)',
  emptyStateBody: 'rgba(85, 89, 112, 0.59)',
  /** Header file count ("0 files"). */
  textCount: 'rgba(0, 0, 0, 0.56)',
  /** Forms empty-state body copy. */
  textFaint: 'rgba(0, 0, 0, 0.42)',
  /** Forms empty-state card shadow. */
  shadowEmptyCard: 'rgba(0, 0, 0, 0.15)',
  /** "Payment Sent" form status dot. */
  statusPaymentSent: '#00AA34',

  // Info popup (frosted alert)
  scrim: 'rgba(0, 0, 0, 0.19)',
  alertSurface: 'rgba(249, 249, 249, 0.78)',
  alertButton: 'rgba(172, 172, 172, 0.52)',

  // Settlement details (Figma 172:400)
  iosLink: '#027FFF',
  infoPill: '#F1F2F6',
  textDetailBody: '#737E86',
  textDetailCaption: '#6A757E',
  divider: 'rgba(0, 0, 0, 0.09)',

  // Home menu popover (Figma 136:949)
  menuText: '#2C3E50',

  // Onboarding example cards (Figma 111:147 "No proof?" card, 111:197 testimonial card)
  /** M3 `schemes/primary-fixed-dim`: light lavender card fill. */
  primaryFixedDim: '#D0BCFF',
  /** M3 `schemes/primary-container`: pale lavender card border. */
  primaryContainer: '#EADDFF',
  /** Deep purple fill of the "No Proof" pill and testimonial card (one shade off purple-600). */
  cardPurple: '#7B2DD7',

  // Onboarding notification mock (Figma 111:100)
  notificationIcon: '#7C2ED8',
} as const;

/** Gradients (CSS syntax for `experimental_backgroundImage`). */
export const Gradients = {
  purpleCard: `linear-gradient(105.84deg, ${Palette.purple[800]} 0.65%, ${Palette.purple[500]} 97.45%)`,
} as const;

export type PaletteColor = typeof Palette;
export type BrandColor = keyof typeof Brand;
export type UiColor = keyof typeof Ui;
