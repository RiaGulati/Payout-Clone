// Figma: "Home - 1" (153:387) — settlements list; "Home - 2" (136:949) — header menu popover;
// "Home - 3" (176:470) — "How Class Action Lawsuits Work" info modal.
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/app/app-header';
import { ErrorState, LoadingState } from '@/components/app/load-state';
import { CategoryChips } from '@/components/home/category-chips';
import { FeaturedCard } from '@/components/home/featured-card';
import { HomeMenu, type HomeMenuItem } from '@/components/home/home-menu';
import { HowItWorksModal } from '@/components/home/how-it-works-modal';
import { SettlementBadgeIcon } from '@/components/home/settlement-badge';
import { SettlementRow } from '@/components/home/settlement-row';
import { UpgradeBanner } from '@/components/home/upgrade-banner';
import { Ui } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import type { CategoryFilter, Settlement } from '@/data/settlements';
import { useRemoteData } from '@/hooks/use-remote-data';
import { fetchSettlements } from '@/lib/api';

const MENU_LINKS: Record<Exclude<HomeMenuItem, 'how-it-works'>, string> = {
  privacy: 'Privacy Policy',
  terms: 'Terms of Use',
  support: 'Contact Support',
};

function openSettlement(id: string) {
  router.push({ pathname: '/settlement/[id]', params: { id } });
}

export default function HomeScreen() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const { state, retry } = useRemoteData(fetchSettlements, undefined);

  const all: Settlement[] = state.status === 'ready' ? state.data : [];
  const featured = all.filter((s) => s.featured);
  const listed = all.filter((s) => !s.featured);
  const settlements = category === 'all' ? listed : listed.filter((s) => s.category === category);

  const handleMenuSelect = (item: HomeMenuItem) => {
    setMenuOpen(false);
    if (item === 'how-it-works') {
      setInfoOpen(true);
    } else {
      Alert.alert(MENU_LINKS[item], 'Coming soon.');
    }
  };

  return (
    <View style={styles.screen}>
      <AppHeader title="Settlements" onMenuPress={() => setMenuOpen(true)} />

      {state.status === 'loading' && <LoadingState />}
      {state.status === 'error' && <ErrorState onRetry={retry} />}
      {state.status === 'ready' && (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.featuredHeader}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <SettlementBadgeIcon kind="no-proof" />
                <Text style={styles.legendLabel}>No Proof</Text>
              </View>
              <View style={styles.legendItem}>
                <SettlementBadgeIcon kind="uncapped" />
                <Text style={styles.legendLabel}>Uncapped</Text>
              </View>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={375 + 17}
            decelerationRate="fast"
            style={styles.featuredScroller}
            contentContainerStyle={styles.featuredContent}>
            {featured.map((s) => (
              <FeaturedCard key={s.id} settlement={s} onPress={() => openSettlement(s.id)} />
            ))}
          </ScrollView>

          <View style={styles.inset}>
            <UpgradeBanner onUpgrade={() => router.push('/upgrade')} />
          </View>

          <CategoryChips value={category} onChange={setCategory} />

          <View style={[styles.inset, styles.list]}>
            {settlements.map((s) => (
              <SettlementRow key={s.id} settlement={s} onPress={() => openSettlement(s.id)} />
            ))}
            {settlements.length === 0 && (
              <Text style={styles.emptyLabel}>No settlements in this category yet.</Text>
            )}
          </View>
        </ScrollView>
      )}

      <HomeMenu visible={menuOpen} onClose={() => setMenuOpen(false)} onSelect={handleMenuSelect} />
      <HowItWorksModal visible={infoOpen} onClose={() => setInfoOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Ui.appBackground,
  },
  content: {
    paddingTop: 18,
    paddingBottom: 32,
    gap: 16,
  },
  inset: {
    paddingLeft: 21,
    paddingRight: 20,
  },
  featuredHeader: {
    paddingLeft: 21,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Figma: 25px between the header row and the cards (16 from the parent gap + 9).
    marginBottom: 9,
  },
  sectionTitle: {
    ...Typography.titleLarge,
    color: Ui.textPrimary,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  legendLabel: {
    ...Typography.buttonMedium,
    color: Ui.textSubtle,
  },
  featuredScroller: {
    // Leave room for the card shadow, which ScrollView would otherwise clip.
    marginVertical: -6,
  },
  featuredContent: {
    gap: 17,
    paddingHorizontal: 21,
    paddingVertical: 6,
  },
  list: {
    gap: 17,
  },
  emptyLabel: {
    ...Typography.caption,
    color: Ui.textMuted,
    textAlign: 'center',
    paddingVertical: 32,
  },
});
