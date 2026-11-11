import type { ImageSource } from 'expo-image';

/** Mock settlements for the Home list and Settlement Details screens (frontend only). */

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

const placeholderThumb = require('@/assets/images/settlements/placeholder-thumb.png');
const googleLogo = require('@/assets/images/brands/google.png');

const instagramSummary =
  'You may get a cut of a $1M settlement over potential arbitration claims for harms from instagram’s allegedly addictive design..';
const instagramDescription =
  'Users who experienced harm from Instagram’s allegedly addictive features may be eligible to file an individual arbitration claim. Submit your information to see if you qualify and get matched with a law firm handling these claims at no upfront cost.';

export const SETTLEMENTS: Settlement[] = [
  {
    id: 'featured-1',
    amount: '$20-$50',
    minimumClaim: '$20',
    daysLeft: 5,
    badge: 'no-proof',
    category: 'upcoming',
    featured: true,
    claimsFilled: 1274,
    claimsTotal: 12000,
    company: 'Instagram',
    title: 'Instagram Social Media Addiction Arbitration Claims',
    summary: instagramSummary,
    description: instagramDescription,
    thumbnail: placeholderThumb,
    logo: googleLogo,
  },
  {
    id: 'featured-2',
    amount: '$20-$50',
    minimumClaim: '$20',
    daysLeft: 5,
    category: 'upcoming',
    featured: true,
    claimsFilled: 1274,
    claimsTotal: 12000,
    company: 'Instagram',
    title: 'Instagram Social Media Addiction Arbitration Claims',
    summary: instagramSummary,
    description: instagramDescription,
    thumbnail: placeholderThumb,
    logo: googleLogo,
  },
  {
    id: 'upcoming-3000',
    amount: '$3000+',
    minimumClaim: '$3,000',
    daysLeft: 5,
    badge: 'no-proof',
    category: 'upcoming',
    company: 'Instagram',
    title: 'Instagram Social Media Addiction Arbitration Claims',
    summary: instagramSummary,
    description: instagramDescription,
    thumbnail: placeholderThumb,
    logo: googleLogo,
  },
  {
    id: 'instagram-addiction',
    amount: '$1000+',
    minimumClaim: '$1,000',
    daysLeft: 576,
    badge: 'uncapped',
    category: 'privacy',
    company: 'Instagram',
    title: 'Instagram Social Media Addiction Arbitration Claims',
    summary: instagramSummary,
    description: instagramDescription,
    thumbnail: placeholderThumb,
    logo: googleLogo,
  },
  {
    id: 'false-ads-1000',
    amount: '$1000+',
    minimumClaim: '$1,000',
    daysLeft: 567,
    badge: 'uncapped',
    category: 'false-ads',
    company: 'Instagram',
    title: 'Instagram Social Media Addiction Arbitration Claims',
    summary: instagramSummary,
    description: instagramDescription,
    thumbnail: placeholderThumb,
    logo: googleLogo,
  },
  {
    id: 'overbilling-1000',
    amount: '$1000+',
    minimumClaim: '$1,000',
    daysLeft: 567,
    badge: 'uncapped',
    category: 'overbilling',
    company: 'Instagram',
    title: 'Instagram Social Media Addiction Arbitration Claims',
    summary: instagramSummary,
    description: instagramDescription,
    thumbnail: placeholderThumb,
    logo: googleLogo,
  },
];

export const FEATURED_SETTLEMENTS = SETTLEMENTS.filter((s) => s.featured);
export const LISTED_SETTLEMENTS = SETTLEMENTS.filter((s) => !s.featured);

export function getSettlement(id: string | undefined): Settlement {
  return SETTLEMENTS.find((s) => s.id === id) ?? SETTLEMENTS[0];
}

export function formatDue(daysLeft: number): string {
  return `Due in ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'}`;
}
