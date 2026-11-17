import type { ImageSource } from 'expo-image';

export type FormStatus = 'pending' | 'payment-sent' | 'case-closed';

export const FORM_STATUSES: { value: FormStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'payment-sent', label: 'Payment Sent' },
  { value: 'case-closed', label: 'Case Closed' },
];

export type SavedForm = {
  id: string;
  title: string;
  logo: ImageSource;
  /** Human-readable submission date, e.g. "Feb 14, 2026". */
  submittedOn: string;
  status: FormStatus;
};
