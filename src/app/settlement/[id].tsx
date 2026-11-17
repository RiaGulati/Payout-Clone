// Figma: "Settlement Details" (172:400).
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { Alert, ScrollView, Share, StyleSheet, Text, View } from 'react-native';

import { ErrorState, LoadingState } from '@/components/app/load-state';
import { HowItWorksModal } from '@/components/home/how-it-works-modal';
import { SettlementBadge } from '@/components/home/settlement-badge';
import { SettlementActions } from '@/components/settlement/settlement-actions';
import { SettlementNavBar } from '@/components/settlement/settlement-nav-bar';
import { Ui } from '@/constants/colors';
import { Radius } from '@/constants/theme';
import { Typography } from '@/constants/typography';
import { formatDue, type Settlement } from '@/data/settlements';
import { useRemoteData } from '@/hooks/use-remote-data';
import { fetchSettlement, startClaim } from '@/lib/api';

const CALENDAR = require('@/assets/images/settlement/calendar.svg');

export default function SettlementDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, retry } = useRemoteData(fetchSettlement, id);
  const [infoOpen, setInfoOpen] = useState(false);

  const navBar = (
    <SettlementNavBar title="Settlement Details" onBack={() => router.back()} onInfo={() => setInfoOpen(true)} />
  );

  if (state.status !== 'ready' || !state.data) {
    return (
      <View style={styles.screen}>
        {navBar}
        <View style={styles.statusWrap}>
          {state.status === 'loading' && <LoadingState />}
          {state.status === 'error' && <ErrorState onRetry={retry} />}
          {state.status === 'ready' && (
            <ErrorState
              message="This settlement is no longer available."
              retryLabel="Go back"
              onRetry={() => router.back()}
            />
          )}
        </View>
        <HowItWorksModal visible={infoOpen} onClose={() => setInfoOpen(false)} />
      </View>
    );
  }

  return (
    <SettlementDetails
      settlement={state.data}
      navBar={navBar}
      infoOpen={infoOpen}
      onCloseInfo={() => setInfoOpen(false)}
    />
  );
}

type SettlementDetailsProps = {
  settlement: Settlement;
  navBar: ReactNode;
  infoOpen: boolean;
  onCloseInfo: () => void;
};

function SettlementDetails({ settlement, navBar, infoOpen, onCloseInfo }: SettlementDetailsProps) {
  const [submitting, setSubmitting] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${settlement.title} — you could claim at least ${settlement.minimumClaim}. ${formatDue(settlement.daysLeft)}.`,
      });
    } catch {
      // The user dismissed the share sheet or sharing is unavailable; nothing to do.
    }
  };

  const handleGetStarted = async () => {
    if (submitting) return;
    setSubmitting(true);
    const result = await startClaim(settlement.id);
    setSubmitting(false);

    if (result.status === 'started') {
      Alert.alert('Claim started', 'Track its progress in your Wallet.', [
        { text: 'OK', style: 'cancel' },
        { text: 'Go to Wallet', onPress: () => router.navigate('/wallet') },
      ]);
    } else if (result.status === 'duplicate') {
      Alert.alert('Already claimed', 'You’ve already started this claim. Find it in your Wallet.');
    } else {
      Alert.alert('Couldn’t start your claim', 'Check your connection and try again.');
    }
  };

  return (
    <View style={styles.screen}>
      {navBar}

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={settlement.logo} style={styles.logo} contentFit="cover" />
          <Text style={styles.amount}>claim at least {settlement.minimumClaim}</Text>
          <Text style={styles.company}>{settlement.company}</Text>
        </View>

        <View style={styles.divider} />

        {settlement.badge && (
          <View style={styles.badgeRow}>
            <SettlementBadge kind={settlement.badge} size="large" />
          </View>
        )}

        <View style={[styles.section, styles.sectionFirst]}>
          <Text style={styles.title}>{settlement.title}</Text>
          <Text style={styles.body}>{settlement.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Deadline to claim</Text>
          <View style={styles.deadline}>
            <Image source={CALENDAR} style={styles.calendar} />
            <Text style={styles.body}>{formatDue(settlement.daysLeft)}</Text>
          </View>
        </View>

        {/* The frame cuts off below the "Description" heading; the body copy is placeholder text. */}
        <View style={styles.section}>
          <Text style={styles.heading}>Description</Text>
          <Text style={styles.body}>{settlement.description}</Text>
        </View>
      </ScrollView>

      <SettlementActions onShare={handleShare} onGetStarted={handleGetStarted} busy={submitting} />
      <HowItWorksModal visible={infoOpen} onClose={onCloseInfo} />
    </View>
  );
}

// Vertical rhythm from Figma 253:442 (content column at y=177): logo → 35 → amount → 35 → company
// (12pt line boxes there; margins below convert to real line heights), then 25pt gaps,
// 29pt between text sections.
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Ui.white,
  },
  statusWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    paddingLeft: 22,
    paddingRight: 23,
    paddingTop: 77,
    paddingBottom: 32,
  },
  hero: {
    alignItems: 'center',
  },
  logo: {
    width: 67,
    height: 67,
    borderRadius: Radius.small,
  },
  amount: {
    ...Typography.detailAmount,
    color: Ui.textPrimary,
    textAlign: 'center',
    marginTop: 19.5,
  },
  company: {
    ...Typography.iosBodyMedium,
    lineHeight: 17,
    letterSpacing: 0.28,
    color: Ui.textDetailCaption,
    textAlign: 'center',
    marginTop: 17,
  },
  divider: {
    height: 1,
    backgroundColor: Ui.divider,
    marginTop: 22.5,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 25,
  },
  sectionFirst: {
    marginTop: 25,
  },
  section: {
    marginTop: 29,
    gap: 10,
  },
  title: {
    ...Typography.detailTitle,
    color: Ui.textPrimary,
  },
  heading: {
    ...Typography.detailHeading,
    color: Ui.textPrimary,
  },
  body: {
    ...Typography.detailBody,
    color: Ui.textDetailBody,
  },
  deadline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  calendar: {
    width: 26,
    height: 26,
  },
});
