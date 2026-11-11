import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';

/** Forms top bar (Figma 314:1067): left-aligned "Forms" title and a right "N files" count. */
export function FormsHeader({ fileCount }: { fileCount: number }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safeTop, { paddingTop: insets.top + 12 }]}>
      <View style={styles.bar}>
        <Text style={styles.title} accessibilityRole="header">
          Forms
        </Text>
        <Text style={styles.count}>{fileCount === 1 ? '1 file' : `${fileCount} files`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeTop: {
    backgroundColor: Ui.appBackground,
  },
  bar: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 22,
    paddingRight: 21,
    backgroundColor: Ui.white,
    boxShadow: `0px 0px 4px 0px ${Ui.shadowLight}`,
  },
  title: {
    ...Typography.iosTitleMedium,
    color: Ui.textPrimary,
  },
  count: {
    ...Typography.countLabel,
    color: Ui.textCount,
  },
});
