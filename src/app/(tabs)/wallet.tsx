// Figma: "Wallet - With Claims" (136:1204), "Wallet - No Claims" (136:811),
// "Wallet - popup for more info" (314:1156).
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app/app-header';
import { ClaimsSection } from '@/components/wallet/claims-section';
import { PayoutCard } from '@/components/wallet/payout-card';
import { PayoutInfoModal } from '@/components/wallet/payout-info-modal';
import { Ui } from '@/constants/colors';
import { walletData } from '@/data/claims';

export default function WalletScreen() {
  const [infoVisible, setInfoVisible] = useState(false);
  const { estimatedPayout, claimedCount, notifiedCount, claims } = walletData;
  const inProgress = claims.filter((c) => c.status === 'in-progress');
  const finished = claims.filter((c) => c.status === 'finished');

  return (
    <View style={styles.screen}>
      <AppHeader title="Wallet" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PayoutCard
          estimatedPayout={estimatedPayout}
          claimedCount={claimedCount}
          notifiedCount={notifiedCount}
          onInfoPress={() => setInfoVisible(true)}
        />
        <ClaimsSection
          title="IN-PROGRESS"
          claims={inProgress}
          emptyTitle="No active claims"
          emptyBody="Claims you’ve submitted will appear here"
        />
        <ClaimsSection
          title="FINISHED"
          claims={finished}
          emptyTitle="No completed claims"
          emptyBody="Finished claims will appear here"
        />
      </ScrollView>
      <PayoutInfoModal visible={infoVisible} onClose={() => setInfoVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Ui.appBackground,
  },
  content: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    paddingHorizontal: 20.5,
    paddingTop: 25,
    paddingBottom: 32,
    gap: 20,
  },
});
