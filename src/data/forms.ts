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

const googleLogo = require('@/assets/images/brands/google.png');

export const SAVED_FORMS: SavedForm[] = [
  { id: 'f1', title: 'Apple Data Breach', logo: googleLogo, submittedOn: 'Feb 14, 2026', status: 'pending' },
  { id: 'f2', title: 'Facebook Retail', logo: googleLogo, submittedOn: 'Jan 12, 2025', status: 'payment-sent' },
  { id: 'f3', title: 'Tesla Emissions', logo: googleLogo, submittedOn: 'Jan 12, 2025', status: 'case-closed' },
];

/** Flip to `true` to preview the "Forms - without forms" state. */
export const EMPTY = false;

export const savedForms: SavedForm[] = EMPTY ? [] : SAVED_FORMS;
