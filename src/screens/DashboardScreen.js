import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, layout, radii } from '../../theme';
import { scale } from '../utils/scale';
import { SectionHeader, ScreenHeader } from '../components/ScreenHeader';
import StatusBar from '../components/StatusBar';
import { LowStockRow } from '../components/ProductRows';
import { lowStockItems } from '../data/inventory';

function SalesHeroCard({ sales, orders, delta }) {
  return (
    <View style={styles.hero}>
      <Text style={styles.heroLabel}>Today&apos;s sales</Text>
      <Text style={styles.heroAmount}>{sales}</Text>
      <View style={styles.heroChips}>
        <View style={styles.heroChip}>
          <Text style={styles.heroChipText}>{orders}</Text>
        </View>
        <View style={styles.heroChip}>
          <Text style={styles.heroChipText}>{delta}</Text>
        </View>
      </View>
    </View>
  );
}

function StatCard({ label, value, valueColor = colors.text, grow = false }) {
  return (
    <View style={[styles.statCard, grow && styles.statCardGrow]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
    </View>
  );
}

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Good morning, Francis" subtitle="Here’s how your store is doing today" />

        <SalesHeroCard sales="₱24,580" orders="42 orders" delta="+12% vs yesterday" />

        <View style={styles.statRow}>
          <StatCard label="Items in stock" value="1,284" />
          <StatCard label="Low stock" value="9" valueColor={colors.danger} grow />
        </View>

        <View style={styles.sectionHeaderSpacing}>
          <SectionHeader title="Low stock items" action="View all" />
        </View>

        <View style={styles.list}>
          {lowStockItems.map((item) => (
            <LowStockRow
              key={item.id}
              initial={item.initial}
              name={item.name}
              meta={item.sku}
badge={item.badge}
              tone={item.tone}
              gap={13}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingBottom: scale(20),
  },
  hero: {
    marginLeft: scale(layout.cardLeft),
    width: scale(layout.cardWidth),
    marginTop: scale(13),
    height: scale(129),
    borderRadius: scale(radii.hero),
    backgroundColor: colors.primary,
    paddingLeft: scale(17),
    paddingTop: scale(17),
  },
  heroLabel: {
    fontFamily: fonts.pjs.medium,
    fontSize: scale(11),
    lineHeight: scale(14),
    color: colors.surface,
  },
  heroAmount: {
    marginTop: scale(6),
    fontFamily: fonts.pjs.extrabold,
    fontSize: scale(24),
    lineHeight: scale(30),
    color: colors.surface,
  },
heroChips: {
    flexDirection: 'row',
    marginTop: scale(18),
    marginLeft: scale(10),
    gap: scale(20),
  },
  heroChip: {
    height: scale(21),
    paddingHorizontal: scale(9),
    borderRadius: scale(radii.badge),
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroChipText: {
    fontFamily: fonts.pjs.bold,
    fontSize: scale(10),
    lineHeight: scale(13),
    color: colors.surface,
  },
  statRow: {
    flexDirection: 'row',
    gap: scale(18),
    marginLeft: scale(layout.cardLeft),
    width: scale(layout.cardWidth),
    marginTop: scale(18),
  },
statCard: {
    width: scale(layout.statWidth),
    height: scale(68),
    borderRadius: scale(radii.card),
    borderWidth: 0.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingLeft: scale(17),
    paddingTop: scale(8),
  },
  statCardGrow: {
    flex: 1,
  },
  statLabel: {
    fontFamily: fonts.pjs.regular,
    fontSize: scale(10),
    lineHeight: scale(13),
    color: colors.text,
  },
  statValue: {
    marginTop: scale(6),
    fontFamily: fonts.pjs.bold,
    fontSize: scale(20),
    lineHeight: scale(25),
  },
  sectionHeaderSpacing: {
    marginTop: scale(20),
  },
  list: {
    marginTop: scale(6),
  },
});