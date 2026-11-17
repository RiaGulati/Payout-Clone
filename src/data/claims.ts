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
