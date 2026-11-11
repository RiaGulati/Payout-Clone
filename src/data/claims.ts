import type { ImageSource } from 'expo-image';

export type ClaimStatus = 'in-progress' | 'finished';

export type Claim = {
  id: string;
  brand: string;
  logo: ImageSource;
  /** Estimated payout in whole dollars. */
  amount: number;
  dueInDays: number;
  status: ClaimStatus;
};

export type WalletData = {
  estimatedPayout: number;
  claimedCount: number;
  notifiedCount: number;
  claims: Claim[];
};

const googleLogo = require('@/assets/images/brands/google.png');

export const WALLET_WITH_CLAIMS: WalletData = {
  estimatedPayout: 94,
  claimedCount: 3,
  notifiedCount: 2,
  claims: [
    { id: 'c1', brand: 'Google', logo: googleLogo, amount: 3000, dueInDays: 49, status: 'in-progress' },
    { id: 'c2', brand: 'Google', logo: googleLogo, amount: 3000, dueInDays: 49, status: 'in-progress' },
    { id: 'c3', brand: 'Google', logo: googleLogo, amount: 3000, dueInDays: 49, status: 'finished' },
    { id: 'c4', brand: 'Google', logo: googleLogo, amount: 3000, dueInDays: 49, status: 'finished' },
  ],
};

export const WALLET_EMPTY: WalletData = {
  estimatedPayout: 0,
  claimedCount: 0,
  notifiedCount: 0,
  claims: [],
};

/** Flip to `true` to preview the "Wallet - No Claims" state. */
export const EMPTY = false;

export const walletData: WalletData = EMPTY ? WALLET_EMPTY : WALLET_WITH_CLAIMS;
