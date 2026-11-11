import { Brand, Ui } from '@/constants/colors';
import type { FormStatus } from '@/data/forms';

/** Dot color for each form status (Figma "Forms - with forms - 4" row dots). */
export const FormStatusColor: Record<FormStatus, string> = {
  pending: Brand.accent, // gold-800
  'payment-sent': Ui.statusPaymentSent,
  'case-closed': Brand.error, // red-700
};
