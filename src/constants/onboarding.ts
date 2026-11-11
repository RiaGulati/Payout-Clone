import type { Href } from 'expo-router';

/**
 * Onboarding flow order, matching the left→right, top→bottom layout of the
 * "onboarding flow" section in Figma. Figma frame names are noted per step.
 */
export const ONBOARDING_ROUTES = {
  welcome: '/onboarding', // Onboarding - 3
  classActions: '/onboarding/class-actions', // Onboarding - 1
  billion: '/onboarding/billion', // Onboarding - 2
  weekly: '/onboarding/weekly', // Onboarding - 4
  tracking: '/onboarding/tracking', // Onboarding - 5
  noProof: '/onboarding/no-proof', // Onboarding - 6
  average: '/onboarding/average', // Onboarding - 7
  ranking: '/onboarding/ranking', // Onboarding - 8
  brands: '/onboarding/brands', // Onboarding - 9
  payoutMethod: '/onboarding/payout-method', // Onboarding - 10
  estimating: '/onboarding/estimating', // Onboarding - 11
  estimate: '/onboarding/estimate', // Onboarding - 12
  paywall: '/onboarding/paywall', // Onboarding - 15
  offer: '/onboarding/offer', // Onboarding - 14
} as const satisfies Record<string, Href>;

/** Where the app goes once onboarding finishes. */
export const APP_HOME_ROUTE = '/home' as const satisfies Href;
