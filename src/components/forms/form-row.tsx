import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { FORM_STATUSES, type SavedForm } from '@/data/forms';

import { FormStatusColor } from './form-status';

/** Saved-form card (Figma 314:1090): logo · title + submitted date · status dot (top-right). */
export function FormRow({ form }: { form: SavedForm }) {
  const statusLabel = FORM_STATUSES.find((s) => s.value === form.status)?.label ?? form.status;

  return (
    <View style={styles.card} accessible accessibilityLabel={`${form.title}, ${statusLabel}`}>
      <Image source={form.logo} style={styles.logo} contentFit="cover" />
      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>
          {form.title}
        </Text>
        <Text style={styles.date} numberOfLines={1}>
          Submitted: {form.submittedOn}
        </Text>
      </View>
      <View style={[styles.dot, { backgroundColor: FormStatusColor[form.status] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    backgroundColor: Ui.white,
    borderRadius: 20,
    paddingHorizontal: 17,
    boxShadow: `0px 0px 6px 0px ${Ui.shadowRow}`,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  text: {
    flex: 1,
    marginLeft: 14,
    marginRight: 24,
    // Figma: 28pt title, 6pt gap, 15pt date on a 12pt line box → 3pt gap with the 18pt caption line.
    gap: 3,
  },
  title: {
    ...Typography.titleMedium,
    color: Ui.textPrimary,
  },
  date: {
    ...Typography.caption,
    color: Ui.textMuted,
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
});
