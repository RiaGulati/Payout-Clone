// Figma: "Settlement Details" (172:400).
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Share, StyleSheet, Text, View } from 'react-native';

import { HowItWorksModal } from '@/components/home/how-it-works-modal';
import { SettlementBadge } from '@/components/home/settlement-badge';
import { SettlementActions } from '@/components/settlement/settlement-actions';
import { SettlementNavBar } from '@/components/settlement/settlement-nav-bar';
import { Ui } from '@/constants/colors';
import { Radius } from '@/constants/theme';
import { Typography } from '@/constants/typography';
import { formatDue, getSettlement } from '@/data/settlements';

const CALENDAR = require('@/assets/images/settlement/calendar.svg');

export default function SettlementDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const settlement = getSettlement(id);
  const [infoOpen, setInfoOpen] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${settlement.title} — you could claim at least ${settlement.minimumClaim}. ${formatDue(settlement.daysLeft)}.`,
      });
    } catch {
      // The user dismissed the share sheet or sharing is unavailable; nothing to do.
    }
  };

  const handleGetStarted = () => {
    Alert.alert('Get Started', `Claim filing for “${settlement.title}” is coming soon.`);
  };

  return (
    <View style={styles.screen}>
      <SettlementNavBar
        title="Settlement Details"
        onBack={() => router.back()}
        onInfo={() => setInfoOpen(true)}
      />

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

      <SettlementActions onShare={handleShare} onGetStarted={handleGetStarted} />
      <HowItWorksModal visible={infoOpen} onClose={() => setInfoOpen(false)} />
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
