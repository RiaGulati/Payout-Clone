import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Palette, Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import type { Claim } from '@/data/claims';

import { ClaimRow } from './claim-row';

type ClaimsSectionProps = {
  title: string;
  claims: Claim[];
  emptyTitle: string;
  emptyBody: string;
};

/** "IN-PROGRESS" / "FINISHED" section; shows a clock placeholder when empty. */
export function ClaimsSection({ title, claims, emptyTitle, emptyBody }: ClaimsSectionProps) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {claims.length > 0 ? (
        <View style={styles.list}>
          {claims.map((claim) => (
            <ClaimRow key={claim.id} claim={claim} />
          ))}
        </View>
      ) : (
        <View style={styles.empty}>
          <View style={styles.clockBox}>
            <Image source={require('@/assets/images/wallet/clock.svg')} style={styles.clock} />
          </View>
          <Text style={styles.emptyTitle}>{emptyTitle}</Text>
          <Text style={styles.emptyBody}>{emptyBody}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.iosTitleMedium,
    letterSpacing: 0,
    color: Palette.neutral[600],
  },
  list: {
    marginTop: 15,
    gap: 17,
  },
  empty: {
    alignSelf: 'center',
    width: 270,
    alignItems: 'center',
    paddingTop: 65,
    paddingBottom: 31,
  },
  clockBox: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  clock: {
    width: 24.8333,
    height: 24.8333,
  },
  emptyTitle: {
    ...Typography.emptyStateTitle,
    color: Palette.neutral[600],
    textAlign: 'center',
  },
  emptyBody: {
    ...Typography.iosBodyMedium,
    letterSpacing: 0,
    color: Ui.emptyStateBody,
    textAlign: 'center',
  },
});
