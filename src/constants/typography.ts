/**
 * Text styles from the MDB Mode Mobile Figma file.
 *
 * Figma uses two families:
 *  - "SF Pro" (iOS system font) → the platform system font (fontFamily left undefined).
 *    On Android this falls back to the system default (Roboto).
 *  - "Family Sans" / Roboto → loaded via @expo-google-fonts/roboto in the root layout.
 *    Custom fonts need a weight-specific family name; don't combine them with `fontWeight`.
 *
 * Figma weight 590 (SF Semibold) → '600', 510 (SF Medium) → '500', 1000 (Black) → '900'.
 */
import type { TextStyle } from 'react-native';

export const FontFamily = {
  robotoRegular: 'Roboto_400Regular',
  robotoMedium: 'Roboto_500Medium',
  robotoBold: 'Roboto_700Bold',
} as const;

type TypeStyle = Pick<
  TextStyle,
  'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'letterSpacing' | 'fontStyle'
>;

const sf = (
  fontSize: number,
  fontWeight: TextStyle['fontWeight'],
  lineHeight?: number,
  letterSpacing = 0,
): TypeStyle => ({ fontSize, fontWeight, lineHeight, letterSpacing });

const roboto = (
  fontFamily: string,
  fontSize: number,
  lineHeight: number,
  letterSpacing = 0,
): TypeStyle => ({ fontFamily, fontSize, lineHeight, letterSpacing });

export const Typography = {
  // ── SF Pro (system) ────────────────────────────────────────────────
  /** Onboarding hero headline: SF Pro Black Italic 40/40, tracking 2. */
  onboardingTitle: { ...sf(40, '900', 40, 2), fontStyle: 'italic' },
  /** Onboarding supporting copy: SF Pro Bold 16, tracking 0.5. */
  onboardingBody: sf(16, '700', 19, 0.5),
  /** ios-button-large: SF Semibold 20/24. */
  buttonLarge: sf(20, '600', 24),
  /** ios-button-medium: SF Semibold 15/24. */
  buttonMedium: sf(15, '600', 24),
  /** ios-headline-medium: SF Regular 28/32. */
  iosHeadlineMedium: sf(28, '400', 32),
  /** ios-headline-small: SF Regular 24/32. */
  iosHeadlineSmall: sf(24, '400', 32),
  /** ios-title-large: SF Bold 24/28. */
  iosTitleLarge: sf(24, '700', 28),
  /** ios-title-medium: SF Bold 20/28, tracking 0.15. */
  iosTitleMedium: sf(20, '700', 28, 0.15),
  /** ios-body-large: SF Regular 16/24, tracking 0.5. */
  iosBodyLarge: sf(16, '400', 24, 0.5),
  /** ios-body-medium: SF Regular 14/20, tracking 0.25. */
  iosBodyMedium: sf(14, '400', 20, 0.25),
  /** Nav bar title (e.g. "Settlements"): SF Bold 17. */
  navTitle: sf(17, '700', 22),
  /** Secondary row text (e.g. "Due in 5 days"): SF Regular 15. */
  caption: sf(15, '400', 18),
  /** Status chip label: SF Semibold 13, tracking -0.26. */
  chipLabel: sf(13, '600', 16, -0.26),
  /** Tab bar label: SF Medium 10. */
  tabLabel: sf(10, '500', 12),
  /** Empty-state headline (e.g. "No active claims"): SF Semibold 16. */
  emptyStateTitle: sf(16, '600', 22),
  /** Header count ("0 files"): SF Medium 15/24, tracking 0.5. */
  countLabel: sf(15, '500', 24, 0.5),
  /** Status legend label ("Pending"): SF Semibold 15/28. */
  legendLabel: sf(15, '600', 28),
  /** Alert / popup title: SF Semibold 17/23. */
  alertTitle: sf(17, '600', 23),
  /** Alert / popup button: SF Semibold 18/20, tracking 0.5. */
  alertButton: sf(18, '600', 20, 0.5),
  /** Menu popover item ("Privacy Policy"): SF Medium 17/22. */
  menuItem: sf(17, '500', 22),
  /** Settlement details amount ("claim at least $1,000"): SF Bold 36, tracking 0.72. */
  detailAmount: sf(36, '700', 43, 0.72),
  /** Settlement details headline: SF Semibold 22/30. */
  detailTitle: sf(22, '600', 30),
  /** Settlement details section heading ("Deadline to claim"): SF Semibold 20/30. */
  detailHeading: sf(20, '600', 30),
  /** Settlement details body copy: SF Regular 18/28, tracking -0.36. */
  detailBody: sf(18, '400', 28, -0.36),
  /** Paywall headline: SF Pro Black Italic 37/33, tracking -1. */
  paywallTitle: { ...sf(37, '900', 33, -1), fontStyle: 'italic' },
  /** One-time offer headline: SF Pro Black 34/33, tracking 1.5. */
  offerTitle: sf(34, '900', 33, 1.5),
  /** One-time offer copy: SF Pro Bold 28/30, tracking 0.5. */
  offerBody: sf(28, '700', 30, 0.5),
  /** Offer badge label: SF Pro Heavy 16/24, tracking 0.5. */
  offerBadge: sf(16, '800', 24, 0.5),

  // ── Roboto ("Family Sans", Material 3 scale) ───────────────────────
  displaySmall: roboto(FontFamily.robotoRegular, 36, 48),
  headlineSmall: roboto(FontFamily.robotoRegular, 24, 32),
  titleLarge: roboto(FontFamily.robotoBold, 24, 28),
  titleMedium: roboto(FontFamily.robotoBold, 20, 28, 0.15),
  titleSmall: roboto(FontFamily.robotoBold, 16, 20, 0.1),
  bodyLarge: roboto(FontFamily.robotoRegular, 16, 24, 0.5),
  bodyLargeEmphasized: roboto(FontFamily.robotoMedium, 16, 24, 0.5),
  bodyMedium: roboto(FontFamily.robotoRegular, 14, 20, 0.25),
  bodySmall: roboto(FontFamily.robotoRegular, 12, 16, 0.4),
  labelMedium: roboto(FontFamily.robotoMedium, 12, 16, 0.5),
  /** Button/Medium: Roboto Bold 14/20, tracking 0.5. */
  buttonMediumRoboto: roboto(FontFamily.robotoBold, 14, 20, 0.5),
} as const satisfies Record<string, TypeStyle>;

export type TypographyVariant = keyof typeof Typography;
