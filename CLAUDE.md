# Figma → Code Design System Rules

General Expo/RN rules (versioned docs, `npx expo install`, CNG, lint + typecheck before done) live in `AGENTS.md` and still apply. This file covers how to turn **MDB Mode Mobile** Figma designs into code in this repo.

## Figma source

- **Working file:** `lInqnFCTmoEXIDlC57GluH` ("MDB Mode Mobile (Copy)").
  - Page `0:1` "Hifi" has two sections: **onboarding flow** (`248:634`) and **in app flow** (`13:33936`).
  - The original file `nrYB5DULFAcuGqvWjpuJnq` is view-only for the connected account, so the MCP can't read it.
- **Don't implement:**
  - Frames named `IMG_*`: reference screenshots of another app.
  - "no screen comparison because of paid plan" frames (`248:740`, `314:1153`): placeholders.
  - "Status Bar" and "Home Indicator" layers: the OS draws these.
- **MCP limits:** View/Collab seats get 20 MCP calls per month. Full/Dev seats on Professional or Education get 200 per day, 10 per minute.
  - Check the plan with `whoami` before a batch of calls.
  - Fetch one `get_design_context` per frame and reuse it. Don't re-fetch.
- **Status:** every implemented frame has been checked against its `get_design_context` output. The connected account is on the Education plan with a Full seat.
- **Design System page:** `1:32629` (Colors `1:32830`, Typography Android/Roboto `1:33183`, Typography iOS/SF Pro `1:33235`).

---

## 1. Tokens

All tokens are hand-maintained TypeScript `as const` objects. There's **no token pipeline** (no Style Dictionary or Tokens Studio, no Figma variable sync); copy values from `get_variable_defs` by hand.

| Token type | File | Export |
|---|---|---|
| Raw palette (Pink/Purple/Blue/Gold/Red/Green/Neutral scales) | `src/constants/colors.ts` | `Palette` |
| Brand roles | `src/constants/colors.ts` | `Brand` |
| Semantic & one-off UI colors | `src/constants/colors.ts` | `Ui` |
| Gradients (CSS strings) | `src/constants/colors.ts` | `Gradients` |
| Text styles | `src/constants/typography.ts` | `Typography`, `FontFamily` |
| Spacing, corner radii | `src/constants/theme.ts` | `Spacing`, `Radius` |
| Onboarding route order | `src/constants/onboarding.ts` | `ONBOARDING_ROUTES`, `APP_HOME_ROUTE` |

### Colors: `src/constants/colors.ts` is the ONLY file allowed to contain hex or rgba values

```ts
export const Palette = {
  pink:   { 200: '#FE86B3', 300: '#FE4F94', 400: '#FD007C', 500: '#FC0061', 600: '#EB005F', 700: '#D5005B' },
  purple: { 300: '#B26DEB', 400: '#A04DE5', 500: '#8E2EDF', 600: '#7E2DD8', 700: '#642AD0', 800: '#4A27C9' },
  // blue 200–700, gold 400–900, red 400–900, green 300–800, neutral 0…9999
} as const;

export const Brand = {
  primary: Palette.pink[400],      // Pink = Primary
  secondary: Palette.purple[500],  // Purple = Secondary
  tertiary: Palette.blue[300],     // Blue = Tertiary
  accent: Palette.gold[800],       // Gold = Accent
  error: Palette.red[700],         // Red = Error
  complementary: Palette.green[500],
  base: Palette.neutral[200],
} as const;

export const Ui = {
  appBackground: '#F7F9F8', textMuted: '#6C757E', claimPurple: '#5129CB',
  noProofBackground: '#E4F6E7', noProofText: '#00AA34', /* … */
  shadowCard: 'rgba(0, 0, 0, 0.1)', /* … */
} as const;

export const Gradients = {
  purpleCard: `linear-gradient(105.84deg, ${Palette.purple[800]} 0.65%, ${Palette.purple[500]} 97.45%)`,
} as const;
```

**Mapping rules:**

1. **Figma palette variables** (`purple-600`, `Purple/Purple-600`) map to `Palette.purple[600]`. Always reference the palette when the hex matches, even inside `Ui`, e.g. `white: Palette.neutral[0]`.
2. **Off-palette colors** get a key in `Ui`, named by meaning, not by screen (`textMuted`, not `homeGrey`). Put it in the matching comment group: Surfaces, Text, Lines & tracks, Accents, Status chips, Shadows, Paywall/offer, Wallet/Forms, Info popup.
3. **Translucent colors** are separate `Ui` tokens in `rgba(...)` form. There's no alpha helper.
4. **Shadows** are `boxShadow` strings built from `Ui.shadow*`, e.g. `` boxShadow: `0px 0px 4px 1px ${Ui.shadowCard}` ``.
5. **Gradients:** add CSS strings to `Gradients` and apply them with `experimental_backgroundImage`.
6. `Palette.neutral[900]` is `#110D1B` (the swatch fill; its Figma label `#201F` is a typo).

Check with `grep -rnE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src | grep -v src/constants/colors.ts`, which must return nothing.

### Typography: `src/constants/typography.ts`

Figma uses two families:
- **"SF Pro"**: the platform system font, so leave `fontFamily` unset.
- **"Family Sans" (Roboto)**: weight-specific families loaded in `src/app/_layout.tsx`.

```ts
export const FontFamily = {
  robotoRegular: 'Roboto_400Regular',
  robotoMedium: 'Roboto_500Medium',
  robotoBold: 'Roboto_700Bold',
} as const;

export const Typography = {
  onboardingTitle: { ...sf(40, '900', 40, 2), fontStyle: 'italic' }, // SF Black Italic
  buttonLarge: sf(20, '600', 24),             // Figma "ios-button-large"
  iosTitleMedium: sf(20, '700', 28, 0.15),    // Figma "ios-title-medium"
  bodySmall: roboto(FontFamily.robotoRegular, 12, 16, 0.4), // Figma "Body/Small"
  // …
} as const satisfies Record<string, TypeStyle>;
```

**Available variants:**
- **SF / system:**
  - Onboarding and paywall: `onboardingTitle`, `onboardingBody`, `paywallTitle`, `offerTitle`, `offerBody`, `offerBadge`
  - Buttons: `buttonLarge`, `buttonMedium`
  - Figma iOS styles: `iosHeadlineMedium`, `iosHeadlineSmall`, `iosTitleLarge`, `iosTitleMedium`, `iosBodyLarge`, `iosBodyMedium`
  - App UI: `navTitle`, `caption`, `chipLabel`, `tabLabel`, `emptyStateTitle`, `menuItem`, `detailAmount`
  - Popups: `alertTitle`, `alertButton`, `alertBody`
- **Roboto (M3 scale):** `displaySmall`, `headlineSmall`, `titleLarge`, `titleMedium`, `titleSmall`, `bodyLarge`, `bodyLargeEmphasized`, `bodyMedium`, `bodySmall`, `labelMedium`, `buttonMediumRoboto`

**Rules:**
- Spread a variant into the style, then add color: `{ ...Typography.caption, color: Ui.textMuted }`. Override single properties after the spread when a frame deviates (e.g. `fontSize: 30`).
- **Weight mapping:** Figma SF weights map as 590 → `'600'`, 510 → `'500'`, 1000 (Black) → `'900'`.
- **Never** combine a Roboto `fontFamily` with `fontWeight`; pick the weight-specific family instead. To switch a Roboto variant back to the system font, set `fontFamily: undefined`.
- Add a new variant only when no existing one matches. Name it by role and comment it with the Figma style name and size.

### Spacing & radius: `src/constants/theme.ts`

```ts
export const Spacing = { half: 2, one: 4, two: 8, three: 16, four: 24, five: 32, six: 64 } as const;
export const Radius = { small: 8, medium: 12, large: 16, largeIncreased: 20, pill: 1000 } as const; // Figma Corner/*
```

Use these when the value matches. Literal numbers measured from the Figma frame are fine for one-off layout values (paddings, offsets, fixed widths). Comment non-obvious ones with their Figma source, e.g. `// Card top sits at y≈280 in the 956pt frame.`

---

## 2. Components

The architecture: function components with typed props, named exports, kebab-case filenames, and `StyleSheet.create` at the bottom of each file. Screens compose feature components; feature components compose the shared ones below. There's **no Storybook, no component docs and no Code Connect mappings**, so a JSDoc line on each component names its Figma source.

### Shared (reuse first)

| Component | File | Notes |
|---|---|---|
| `PillButton` | `src/components/pill-button.tsx` | Large CTA. `variant: 'light'` (white bg, purple-600 label) or `'purple'` |
| `OnboardingLayout` | `src/components/onboarding/onboarding-layout.tsx` | Money background (`'default'` / `'welcome'`), `progress` 0–1 (fill width ÷ 365), centered `children`, pinned CTA, `footnote`, `topAccessory`, `contentStyle` |
| `OnboardingProgress` | same file | Standalone progress bar |
| `OnboardingTitle` / `OnboardingBody` | `src/components/onboarding/onboarding-text.tsx` | White SF Black Italic 40 headline and SF Bold 16 body; override via `style` |
| `AppHeader` | `src/components/app/app-header.tsx` | mode logo · centered title · `onMenuPress` menu button, or custom `left` / `right` |
| `AppTabBar` | `src/components/app/app-tab-bar.tsx` | Home / Wallet / Forms navbar, passed to `<Tabs tabBar={…}>` |

### Feature components

| Folder | Components |
|---|---|
| `src/components/onboarding/` | `WeeklyLogoCluster` |
| `src/components/paywall/` | `PaywallScreen` (shared by `onboarding/paywall` and `upgrade`), `PlanCard`, `PaywallLogoCluster`, `CloseButton` (`onDark` / `onLight`) |
| `src/components/home/` | `FeaturedCard`, `SettlementRow`, `SettlementBadge`, `SettlementBadgeIcon`, `ClaimButton`, `UpgradeBanner`, `CategoryChips`, `HomeMenu` (popover), `HowItWorksModal` |
| `src/components/settlement/` | `SettlementNavBar`, `SettlementActions` |
| `src/components/wallet/` | `PayoutCard`, `ClaimsSection` (with an empty state), `ClaimRow`, `PayoutInfoModal` |
| `src/components/forms/` | `FormsHeader`, `StatusFilter`, `FormRow`, `FormsEmptyState`, `form-status.ts` (status → color) |

### Patterns

```tsx
// Shared scaffold + text + route constant (src/app/onboarding/class-actions.tsx)
export default function ClassActionsScreen() {
  return (
    <OnboardingLayout
      progress={30 / 365}
      onPress={() => router.push(ONBOARDING_ROUTES.billion)}
      contentStyle={styles.content}>
      <OnboardingTitle>Class Action Settlements</OnboardingTitle>
      <OnboardingBody>Are when companies have to pay money…</OnboardingBody>
    </OnboardingLayout>
  );
}
```

```tsx
// Pressable with a pressed style; colors from tokens
<Pressable
  accessibilityRole="button"
  onPress={onPress}
  style={({ pressed }) => [styles.button, pressed && styles.pressed]}> {/* pressed: { opacity: 0.7 } */}
```

```tsx
// Overlays: RN Modal, transparent + fade, Android back closes (src/components/wallet/payout-info-modal.tsx)
<Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
  <View style={styles.scrim /* Ui.scrim */}>
    <View style={styles.card /* Ui.alertSurface */}>…</View>
  </View>
</Modal>
```

- **Data:** Supabase (Postgres + anonymous auth + Realtime). Schema and RLS live in `supabase/schema.sql`; `npm run seed` (`backend/seed.ts`, secret key) fills `settlements`.
  - Screens never call Supabase directly: `src/lib/api.ts` reads/writes and maps rows into the UI types in `src/data/` (`Settlement`, `WalletData`, `SavedForm`). `src/lib/supabase.ts` holds the client and `sessionReady()`.
  - Load with `useRemoteData(fetcher, arg, { realtimeTable })` (`src/hooks/use-remote-data.ts`) and render `LoadingState` / `ErrorState` (`src/components/app/load-state.tsx`).
  - Brand logos are local, keyed by `settlements.brand_key` in `src/data/brand-logos.ts`.
  - Links without a destination show `Alert` placeholders.
- **Accessibility:** set `accessibilityRole` on every pressable (`button`, `tab`, `radio`, `checkbox`), `accessibilityState` for selection, and `accessibilityLabel` on image-only controls.

---

## 3. Frameworks & build

- **Stack:** Expo SDK 58, React Native 0.88 (New Architecture), React 19.3, TypeScript 6 (`strict`).
- **Light mode only:** `app.json → userInterfaceStyle: "light"`. `theme.ts` still exports `Colors.light|dark`, but no screen uses them.
- **Expo Router** with routes in `src/app/`:
  - The root `Stack` is in `src/app/_layout.tsx`. It loads the fonts and hides the splash screen.
  - Onboarding uses a nested `Stack`.
  - `(tabs)` uses the JS `Tabs` with the custom `AppTabBar`.
- **Typed routes** (`experiments.typedRoutes`): after adding a route file, run `npx expo start` once to regenerate `.expo/types/router.d.ts`; until then `tsc` rejects the new `href`.
- **v58 JS `Tabs` tabBar API:** the tab bar component receives `{ state, descriptors, emitter, navigateToTab, insets }`. There is no `navigation` prop.

  ```tsx
  const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
  if (!focused && !event.defaultPrevented) navigateToTab(route.key);
  ```
- **React Compiler is on** (`experiments.reactCompiler`), so don't add `useMemo` / `useCallback` / `memo`.
- **Bundler:** Metro. Verify with `npx expo export --platform ios --platform android --output-dir <tmp>`.
- **Lint:** `eslint-config-expo` flat config (`eslint.config.js`).
- **Path aliases:** `@/*` resolves to `src/*` and `@/assets/*` to `assets/*`.
- **Key libraries:**
  - `expo-image`: all images, including SVG.
  - `expo-symbols`: available for system icons, currently unused.
  - `react-native-safe-area-context`
  - `react-native-reanimated`
  - `@expo-google-fonts/roboto`
  - `expo-glass-effect` is installed but unused (it's iOS-only liquid glass).

---

## 4. Styling

- **Method:** `StyleSheet.create` only. There's no NativeWind, Tailwind, styled-components or CSS Modules.
- **Translating `get_design_context` output:** it returns React + Tailwind code absolutely positioned on a 440×956 frame.
  - Convert it to **flexbox** (rows, `gap`, `justifyContent`).
  - Keep absolute positioning only for real overlaps, such as the stacked notification cards in `tracking.tsx` or badges on cards.
  - Vertical rhythm usually comes from `contentStyle.paddingTop` plus `marginTop` / `gap`, derived from the frame's y-coordinates.
- **Safe area:** never draw the status bar or home indicator. Use `useSafeAreaInsets()`; the shared layouts already do.
  - `OnboardingLayout` pins the CTA at Figma's y = 767 (`FOOTER_HEIGHT = 189` plus any inset beyond 34).
  - `AppHeader` sits at `insets.top + 12`.
- **New RN style props:**
  - `boxShadow` (string)
  - `experimental_backgroundImage` (CSS `linear-gradient`)
  - string `fontWeight` values
  - percentage widths
- **Background:** in-app screens use `Ui.appBackground`; onboarding uses the money-pattern image.
- **Responsive:**
  - Design at 440pt width; the iPhone Pro Max simulator matches it.
  - Cap fixed design widths with `maxWidth: '100%'`, center them with `alignSelf: 'center'`, and let content `ScrollView`s handle shorter screens.
  - No breakpoints and no tablet layouts.
- **Global styles:** `src/global.css` only holds web font CSS variables. There's no global RN stylesheet.

---

## 5. Assets

- **Stored in:** `assets/images/<group>/kebab-case.ext` and loaded with a static `require('@/assets/images/…')`. There's no CDN or remote image config.

| Folder | Contents |
|---|---|
| `brand/` | `mode-logo.png` (151×62; shown at 263×108 on onboarding, 68×28 in the header) |
| `brands/` | Third-party logos: `apple`, `apple-white`, `spotify`, `pepsi`, `instagram`, `fortnite`, `google` (PNG) |
| `icons/` | Shared UI icons (SVG): `tab-home`, `tab-wallet`, `tab-forms`, `header-menu`, `check-green`, `star-gold`, `close-x-white` |
| `home/`, `settlement/`, `forms/` | Feature icons: menu icons (`info-circle`, `privacy-tip`, `document`, `question-mark-circle`); `back-chevron`, `calendar`, `send`; `docs-circle` |
| `onboarding/` | `money-background.png` (Figma "image 1"), `money-background-welcome.png` (Figma "image 2", used on most steps) |
| `paywall/`, `wallet/` | Feature icons (`check.svg`, `check-rounded.svg`, `clock.svg`, `question-mark-circle.svg`) |
| `settlements/` | `placeholder-thumb.png`. It's 1728×2304 / 2.5 MB but shown at 45×45, so downsize it before release |
| root | App icon, splash and Android adaptive icons, configured in `app.json` |

**Workflow for Figma assets:**
1. Download every URL in the `get_design_context` response with `curl -sfL -o assets/images/<group>/<name>.<ext> <url>`. The URLs expire after 7 days and must never ship in code.
2. If a file with that name already exists, compare md5 and reuse it when identical. Check `brands/` and `icons/` before adding duplicates.
3. Render with `expo-image` `Image` and keep each SVG at its native width/height.
4. Never redraw or inline SVG paths.
5. Simple solid rectangles (progress bars, pills, dividers) can be Views instead of image files.
6. Emoji in Figma text layers stay as text.

There's no image optimization step. Metro bundles the files as they are.

---

## 6. Icons

**Order of preference:**
1. The Figma-exported SVG or PNG in `assets/images/icons/` (shared) or `assets/images/<feature>/` (feature-only).
2. `expo-symbols` `SymbolView`, only as a last resort when Figma has no exportable asset for an icon. Nothing uses it today; every icon in the app is a Figma export.

```tsx
// Asset icon, tinted per state (src/components/app/app-tab-bar.tsx)
<Image source={require('@/assets/images/icons/tab-wallet.svg')} tintColor={focused ? Ui.black : Ui.tabInactive}
       style={{ width: 39, height: 39 }} />

// One white SVG export, tinted for the light variant (src/components/paywall/close-button.tsx)
<Image source={require('@/assets/images/icons/close-x-white.svg')} tintColor={onDark ? Ui.white : Ui.closeIconOnLight}
       style={{ width: 25, height: 25 }} />
```

- **Naming:** kebab-case by meaning: `tab-*` for navbar icons, a color suffix when the color is baked in (`check-green`, `star-gold`), otherwise the shape (`clock`, `question-mark-circle`).
- **Tinting:** SVG fills are baked in from Figma. Tint with `tintColor` using tokens, never hex.

---

## 7. Project structure

```
src/
  app/                       # routes only (Expo Router)
    _layout.tsx              # root Stack, Roboto font loading, splash, StatusBar
    index.tsx                # <Redirect> → /onboarding
    onboarding/              # 14 steps; order + Figma frame names in src/constants/onboarding.ts
      _layout.tsx            # Stack, slide_from_right, no header
      index.tsx              # welcome (Onboarding - 3) … offer.tsx (Onboarding - 14)
    (tabs)/                  # _layout.tsx (Tabs + AppTabBar), home.tsx, wallet.tsx, forms.tsx
    settlement/[id].tsx      # Settlement Details (push)
    upgrade.tsx              # in-app paywall (fullScreenModal)
  components/
    pill-button.tsx          # shared primitives at the root
    app/                     # app chrome: header, tab bar
    onboarding/ paywall/ home/ settlement/ wallet/ forms/   # feature folders
  constants/                 # colors, typography, theme, onboarding
  data/                      # UI types, filter lists, brand logos
  hooks/                     # useRemoteData
  lib/                       # supabase client, api (all reads/writes)
assets/images/               # grouped assets (see §5)
```

- Every route file starts with a comment naming its Figma frame and node id, e.g. `// Figma: "Onboarding - 6" (111:147) — …`. Keep that when editing.
- Non-route code never goes in `src/app/`.
- A new feature gets a route file (or folder with a `_layout.tsx`), a `src/components/<feature>/` folder, and if needed a `src/data/<feature>.ts`.
- Name new components after the feature or screen (`weekly-logo-cluster.tsx`), not generically.

---

## Figma implementation checklist

1. Parse `fileKey` / `nodeId` from the URL (`node-id=136-444` → `136:444`) and call `create_session` (reuse its `sessionId`).
2. Load the `figma-design-to-code` skill, then call `get_design_context` once per frame (screenshot included) and `get_variable_defs` if new tokens are likely.
3. Map values to `Palette` / `Brand` / `Ui` / `Gradients` / `Typography` / `Spacing` / `Radius`, adding any missing tokens to the constants files.
4. Reuse the shared and feature components above. New pieces go in `src/components/<feature>/`.
5. Download assets locally (§5) and reference them with `require`.
6. Add columns/queries in `supabase/schema.sql` + `src/lib/api.ts` (and the seed) as needed, and wire up the interactions.
7. Verify:
   - `npx tsc --noEmit`
   - `npx expo lint`
   - the raw-color grep (§1)
   - for new routes, regenerate typed routes first
   - for visual checks, run on the iPhone Pro Max simulator and deep-link with `xcrun simctl openurl booted exp://<host>:8081/--/<route>`.
