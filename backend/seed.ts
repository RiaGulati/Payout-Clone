/**
 * Seeds the `settlements` table. Run with `npm run seed`.
 *
 * Uses the SECRET key, which bypasses row level security, so this must only ever run on your machine.
 * Idempotent: rows are upserted on `slug`, so re-running updates them in place.
 *
 * The first six rows mirror the mock data in src/data/settlements.ts (same ids as slugs). That file
 * can't be imported here because it `require`s images, which Node can't load.
 */
import 'dotenv/config';

import { createClient } from '@supabase/supabase-js';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey || secretKey === 'sb_secret_xxx') {
  throw new Error('Missing EXPO_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in .env (see .env.example).');
}

const supabase = createClient(url, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

type Category = 'upcoming' | 'privacy' | 'false-ads' | 'overbilling';
type Badge = 'no-proof' | 'uncapped';

type SettlementRow = {
  slug: string;
  company: string;
  brand_key: string;
  title: string;
  summary: string;
  description: string;
  amount_label: string;
  payout_min: number | null;
  payout_max: number | null;
  deadline: string; // YYYY-MM-DD
  badge: Badge | null;
  category: Category;
  featured: boolean;
  claims_filled: number;
  claims_total: number;
};

const brandKey = (company: string) => company.toLowerCase().replace(/[^a-z0-9]+/g, '-');

function inDays(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** '$20-$50' -> [20, 50]; '$3000+' -> [3000, null]; '$500' -> [500, 500]. */
function parseAmount(label: string): [number | null, number | null] {
  const nums = label.match(/[\d,]+(?:\.\d+)?/g)?.map((n) => Number(n.replace(/,/g, ''))) ?? [];
  if (nums.length === 0) return [null, null];
  if (nums.length === 1) return [nums[0], label.includes('+') ? null : nums[0]];
  return [nums[0], nums[1]];
}

type RowInput = {
  slug: string;
  company: string;
  title: string;
  amount: string;
  daysLeft: number;
  category: Category;
  summary: string;
  description: string;
  badge?: Badge;
  featured?: boolean;
  filled?: number;
  total?: number;
};

function row(input: RowInput): SettlementRow {
  const [min, max] = parseAmount(input.amount);
  return {
    slug: input.slug,
    company: input.company,
    brand_key: brandKey(input.company),
    title: input.title,
    summary: input.summary,
    description: input.description,
    amount_label: input.amount,
    payout_min: min,
    payout_max: max,
    deadline: inDays(input.daysLeft),
    badge: input.badge ?? null,
    category: input.category,
    featured: input.featured ?? false,
    claims_filled: input.filled ?? 0,
    claims_total: input.total ?? 0,
  };
}

// --- From src/data/settlements.ts ------------------------------------------------------------

const instagram = {
  company: 'Instagram',
  title: 'Instagram Social Media Addiction Arbitration Claims',
  summary:
    'You may get a cut of a $1M settlement over potential arbitration claims for harms from instagram’s allegedly addictive design..',
  description:
    'Users who experienced harm from Instagram’s allegedly addictive features may be eligible to file an individual arbitration claim. Submit your information to see if you qualify and get matched with a law firm handling these claims at no upfront cost.',
};

const fromMocks: SettlementRow[] = [
  row({ ...instagram, slug: 'featured-1', amount: '$20-$50', daysLeft: 5, category: 'upcoming', badge: 'no-proof', featured: true, filled: 1274, total: 12000 }),
  row({ ...instagram, slug: 'featured-2', amount: '$20-$50', daysLeft: 5, category: 'upcoming', featured: true, filled: 1274, total: 12000 }),
  row({ ...instagram, slug: 'upcoming-3000', amount: '$3000+', daysLeft: 5, category: 'upcoming', badge: 'no-proof' }),
  row({ ...instagram, slug: 'instagram-addiction', amount: '$1000+', daysLeft: 576, category: 'privacy', badge: 'uncapped' }),
  row({ ...instagram, slug: 'false-ads-1000', amount: '$1000+', daysLeft: 567, category: 'false-ads', badge: 'uncapped' }),
  row({ ...instagram, slug: 'overbilling-1000', amount: '$1000+', daysLeft: 567, category: 'overbilling', badge: 'uncapped' }),
];

// --- Brands that already have a logo in assets/images/brands --------------------------------

const additional: SettlementRow[] = [
  row({
    slug: 'apple-data-breach', company: 'Apple', title: 'Apple Data Breach', amount: '$25-$75', daysLeft: 21,
    category: 'privacy', badge: 'no-proof', featured: true, filled: 3120, total: 20000,
    summary: 'Apple customers whose personal data was exposed in a breach may claim compensation.',
    description: 'Apple customers whose personal data was exposed in a breach may claim compensation. No receipt required.',
  }),
  row({
    slug: 'google-location-tracking', company: 'Google', title: 'Google Location Tracking', amount: '$30-$100', daysLeft: 49,
    category: 'privacy', badge: 'no-proof', filled: 21000, total: 90000,
    summary: 'Users who had Location History turned off but were still tracked may claim a share of the settlement.',
    description: 'Users who had Location History turned off but were still tracked may claim a share of the settlement.',
  }),
  row({
    slug: 'google-play-overcharges', company: 'Google', title: 'Google Play Store Overcharges', amount: '$15-$45', daysLeft: 30,
    category: 'overbilling', filled: 7300, total: 40000,
    summary: 'Android users who paid inflated in-app and app-store prices may be eligible for a refund.',
    description: 'Android users who paid inflated in-app and app-store prices may be eligible for a refund.',
  }),
  row({
    slug: 'fortnite-dark-patterns', company: 'Fortnite', title: 'Fortnite Dark Patterns Refund', amount: '$25-$75', daysLeft: 35,
    category: 'false-ads', filled: 5200, total: 30000,
    summary: 'Players charged for unwanted purchases through misleading design may claim a refund.',
    description: 'Players charged for unwanted purchases through misleading design may claim a refund.',
  }),
  row({
    slug: 'spotify-auto-renewal', company: 'Spotify', title: 'Spotify Premium Auto-Renewal', amount: '$10-$30', daysLeft: 18,
    category: 'overbilling', filled: 920, total: 10000,
    summary: 'Subscribers renewed without clear disclosure may claim reimbursement of the charges.',
    description: 'Subscribers renewed without clear disclosure may claim reimbursement of the charges.',
  }),
  row({
    slug: 'pepsi-misleading-labels', company: 'Pepsi', title: 'Pepsi Misleading Labels', amount: '$5-$20', daysLeft: 75,
    category: 'false-ads', badge: 'uncapped', filled: 430, total: 6000,
    summary: 'Buyers of products carrying misleading "natural" labels may claim a refund.',
    description: 'Buyers of products carrying misleading "natural" labels may claim a refund. Proof of purchase is not required.',
  }),
];

const rows = [...fromMocks, ...additional];

async function main() {
  const { data, error } = await supabase
    .from('settlements')
    .upsert(rows, { onConflict: 'slug' })
    .select('slug');

  if (error) {
    console.error('Seed failed:', error.message);
    if (error.code === '42P01' || /relation .* does not exist/.test(error.message)) {
      console.error('Run supabase/schema.sql in the Supabase SQL editor first.');
    }
    process.exit(1);
  }
  console.log(`Seeded ${data?.length ?? 0} settlements.`);
}

main();
