import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

type FormsEmptyStateProps = {
  title?: string;
  body?: string;
};

/** "No saved forms" card (Figma "Forms - without forms" 314:721). */
export function FormsEmptyState({
  title = 'No saved forms',
  body = 'Forms you fill out will be saved here for your records',
}: FormsEmptyStateProps) {
  return (
    <View style={styles.card}>
      {/* Figma "Frame 106": 60px purple circle with the docs icon baked in. */}
      <Image source={require('@/assets/images/forms/docs-circle.svg')} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 399,
    maxWidth: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Ui.white,
    borderRadius: 15,
    // 221pt-tall card: icon at y=27, title at 103, two-line body at 147.
    paddingTop: 27,
    paddingBottom: 38,
    paddingHorizontal: 27,
    boxShadow: `0px 0px 4.2px 0px ${Ui.shadowEmptyCard}`,
  },
  icon: {
    width: 60,
    height: 60,
  },
  title: {
    ...Typography.iosTitleMedium,
    marginTop: 16,
    color: Ui.textPrimary,
    textAlign: 'center',
  },
  body: {
    ...Typography.caption,
    fontWeight: '500', // SF Medium 15/18
    marginTop: 16,
    color: Ui.textFaint,
    textAlign: 'center',
  },
});
