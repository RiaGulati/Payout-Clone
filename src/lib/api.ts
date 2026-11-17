/**
 * Reads from Supabase, mapped into the UI types in src/data/ so components don't change.
 * Every query waits for `sessionReady()` first, so row level security sees a signed-in user.
 */
import { brandLogo, settlementThumbnail } from '@/data/brand-logos';
import type { Claim, WalletData } from '@/data/claims';
import type { FormStatus, SavedForm } from '@/data/forms';
import type { Settlement, SettlementBadge, SettlementCategory } from '@/data/settlements';
import { sessionReady, supabase } from '@/lib/supabase';

// ---------------------------------------------------------------------------------------------
// Row types (what supabase/schema.sql returns) and mappers
// ---------------------------------------------------------------------------------------------

type SettlementRow = {
  id: string;
  company: string;
  brand_key: string;
  title: string;
  summary: string;
  description: string;
  amount_label: string;
  payout_min: number | null;
  payout_max: number | null;
  deadline: string | null; // YYYY-MM-DD
  badge: SettlementBadge | null;
  category: SettlementCategory;
  featured: boolean;
  claims_filled: number;
  claims_total: number;
};

type ClaimRow = {
  id: string;
  status: 'claimed' | 'notified' | 'paid';
  settlements: SettlementRow | null;
};

type FormRow = {
  id: string;
  status: FormStatus;
  submitted_at: string;
  settlements: SettlementRow | null;
};

const SETTLEMENT_COLUMNS =
  'id, company, brand_key, title, summary, description, amount_label, payout_min, payout_max, deadline, badge, category, featured, claims_filled, claims_total';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function todayISO(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

/** Whole days from today to a `YYYY-MM-DD` deadline, never negative. */
function daysUntil(deadline: string | null): number {
  if (!deadline) return 0;
  const [y, m, d] = deadline.split('-').map(Number);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((new Date(y, m - 1, d).getTime() - today.getTime()) / 86_400_000));
}

/** `2026-02-14T…` -> "Feb 14, 2026". */
function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function toSettlement(row: SettlementRow): Settlement {
  return {
    id: row.id,
    amount: row.amount_label,
    minimumClaim: row.payout_min != null ? `$${row.payout_min.toLocaleString('en-US')}` : row.amount_label,
    daysLeft: daysUntil(row.deadline),
    badge: row.badge ?? undefined,
    category: row.category,
    featured: row.featured,
    claimsFilled: row.claims_filled,
    claimsTotal: row.claims_total,
    company: row.company,
    title: row.title,
    summary: row.summary,
    description: row.description,
    thumbnail: settlementThumbnail(),
    logo: brandLogo(row.brand_key),
  };
}

function toClaim(row: ClaimRow): Claim {
  const s = row.settlements;
  return {
    id: row.id,
    brand: s?.company ?? 'Unknown',
    logo: brandLogo(s?.brand_key),
    amount: s?.payout_min ?? 0,
    dueInDays: daysUntil(s?.deadline ?? null),
    status: row.status === 'paid' ? 'finished' : 'in-progress',
  };
}

function toForm(row: FormRow): SavedForm {
  return {
    id: row.id,
    title: row.settlements?.title ?? 'Untitled form',
    logo: brandLogo(row.settlements?.brand_key),
    submittedOn: formatDate(row.submitted_at),
    status: row.status,
  };
}

// ---------------------------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------------------------

/** Open settlements (deadline today or later, or none), soonest deadline first. */
export async function fetchSettlements(): Promise<Settlement[]> {
  await sessionReady();
  const { data, error } = await supabase
    .from('settlements')
    .select(SETTLEMENT_COLUMNS)
    .or(`deadline.is.null,deadline.gte.${todayISO()}`)
    .order('deadline', { ascending: true, nullsFirst: false });
  if (error) throw error;
  return (data as SettlementRow[]).map(toSettlement);
}

/** One settlement by id, or null if it doesn't exist. */
export async function fetchSettlement(id: string): Promise<Settlement | null> {
  await sessionReady();
  const { data, error } = await supabase.from('settlements').select(SETTLEMENT_COLUMNS).eq('id', id).maybeSingle();
  if (error) {
    // 22P02 = not a valid uuid (e.g. an old mock id), which just means "not found".
    if (error.code === '22P02') return null;
    throw error;
  }
  return data ? toSettlement(data as SettlementRow) : null;
}

/** The signed-in user's claims plus the Wallet card totals. RLS limits rows to this user. */
export async function fetchWallet(): Promise<WalletData> {
  await sessionReady();
  const { data, error } = await supabase
    .from('claims')
    .select(`id, status, settlements (${SETTLEMENT_COLUMNS})`)
    .order('created_at', { ascending: false });
  if (error) throw error;

  const rows = data as unknown as ClaimRow[];
  const claims = rows.map(toClaim);
  return {
    estimatedPayout: claims.reduce((sum, c) => sum + c.amount, 0),
    claimedCount: rows.length,
    notifiedCount: rows.filter((r) => r.status !== 'claimed').length,
    claims,
  };
}

/** The signed-in user's forms, newest first. */
export async function fetchForms(): Promise<SavedForm[]> {
  await sessionReady();
  const { data, error } = await supabase
    .from('forms')
    .select(`id, status, submitted_at, settlements (${SETTLEMENT_COLUMNS})`)
    .order('submitted_at', { ascending: false });
  if (error) throw error;
  return (data as unknown as FormRow[]).map(toForm);
}

// ---------------------------------------------------------------------------------------------
// Writes
// ---------------------------------------------------------------------------------------------

export type StartClaimResult = { status: 'started' } | { status: 'duplicate' } | { status: 'error' };

/**
 * Files a claim for the signed-in user, then opens a `pending` form for it so it shows in the Forms tab.
 * `user_id` is filled in by the database (`default auth.uid()`). The form insert is best-effort: the
 * claim is what matters, so a form failure doesn't fail the call.
 */
export async function startClaim(settlementId: string): Promise<StartClaimResult> {
  try {
    await sessionReady();
  } catch {
    return { status: 'error' };
  }

  const { error } = await supabase.from('claims').insert({ settlement_id: settlementId });
  if (error) {
    // 23505 = unique violation on (user_id, settlement_id): already claimed.
    return { status: error.code === '23505' ? 'duplicate' : 'error' };
  }

  const form = await supabase.from('forms').insert({ settlement_id: settlementId });
  if (form.error) console.warn('Claim started but its form wasn’t created:', form.error.message);
  return { status: 'started' };
}

/** Where a launch should land, from the signed-in user's profile. */
export type ProfileStage = 'onboarding' | 'paywall' | 'done';

export async function fetchProfileStage(): Promise<ProfileStage> {
  const userId = await sessionReady();
  const { data, error } = await supabase
    .from('profiles')
    .select('onboarded, paywall_seen')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw error;
  // No row yet counts as "not onboarded"; the first save upserts it.
  if (!data?.onboarded) return 'onboarding';
  return data.paywall_seen ? 'done' : 'paywall';
}

/** Upserts profile columns for the signed-in user (creates the row if the signup trigger never ran). */
async function writeProfile(values: Record<string, unknown>) {
  const userId = await sessionReady();
  const { error } = await supabase.from('profiles').upsert({ id: userId, ...values });
  if (error) throw error;
}

export function saveOnboardingAnswers(answers: { brands: string[]; payoutMethod: string | null }) {
  return writeProfile({ brands: answers.brands, payout_method: answers.payoutMethod, onboarded: true });
}

export function markPaywallSeen() {
  return writeProfile({ paywall_seen: true });
}
