import type { ImageSource } from 'expo-image';

/** UI types for settlements. Rows come from Supabase via src/lib/api.ts. */

export type SettlementCategory = 'upcoming' | 'privacy' | 'false-ads' | 'overbilling';

export type SettlementBadge = 'no-proof' | 'uncapped';

export type Settlement = {
  id: string;
  /** Payout label shown on cards, e.g. "$20-$50" or "$1000+". */
  amount: string;
  /** Headline amount on the details screen, e.g. "$1,000". */
  minimumClaim: string;
  daysLeft: number;
  badge?: SettlementBadge;
  category: SettlementCategory;
  featured?: boolean;
  /** Claims filled so far / total available (featured cards). */
  claimsFilled?: number;
  claimsTotal?: number;
  company: string;
  title: string;
  summary: string;
  description: string;
  /** List/card thumbnail. */
  thumbnail: ImageSource;
  /** Company logo on the details screen. */
  logo: ImageSource;
};

export type CategoryFilter = 'all' | SettlementCategory;

export const CATEGORY_FILTERS: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'privacy', label: 'Privacy' },
  { key: 'false-ads', label: 'False Ads' },
  { key: 'overbilling', label: 'Overbilling' },
];

export function formatDue(daysLeft: number): string {
  return `Due in ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'}`;
}
