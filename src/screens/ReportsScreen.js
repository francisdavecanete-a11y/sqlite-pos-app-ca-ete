import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, layout, radii } from '../../theme';
import { scale } from '../utils/scale';
import BarChart from '../components/BarChart';
import { SegmentedControl } from '../components/Controls';
import { TopProductRow } from '../components/ProductRows';
import { ScreenHeader, SectionHeader } from '../components/ScreenHeader';
import StatusBar from '../components/StatusBar';
import { reportRanges, reportStats, topProducts, weeklySales } from '../data/inventory';

function StatCard({ label, value, grow = false }) {
  return (
    <View style={[styles.statCard, grow && styles.statCardGrow]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export default function ReportsScreen() {
  const [range, setRange] = useState('This week');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Reports" subtitle="Sales summary" />

        <SegmentedControl
          options={reportRanges.map((label) => ({ label }))}
          value={range}
          onChange={setRange}
          style={styles.segments}
        />

        <BarChart
          label={weeklySales.label}
          value={weeklySales.value}
          days={weeklySales.days}
          activeIndex={weeklySales.activeIndex}
        />

        <View style={styles.statRow}>
          {reportStats.map((stat, index) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} grow={index === 1} />
          ))}
        </View>

        <View style={styles.sectionHeaderSpacing}>
          <SectionHeader title="Top  products" action="See all" compact />
        </View>

        <View style={styles.list}>
          {topProducts.map((product) => (
            <TopProductRow
              key={product.id}
              initial={product.initial}
              name={product.name}
              meta={product.meta}
              value={product.value}
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
  segments: {
    marginTop: scale(17),
    marginHorizontal: scale(20),
    gap: scale(14),
  },
  statRow: {
    flexDirection: 'row',
    gap: scale(18),
    marginLeft: scale(layout.cardLeft),
    width: scale(layout.cardWidth),
    marginTop: scale(17),
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
    color: colors.textMuted,
  },
  statValue: {
    marginTop: scale(6),
    fontFamily: fonts.pjs.bold,
    fontSize: scale(20),
    lineHeight: scale(25),
    color: colors.text,
  },
  sectionHeaderSpacing: {
    marginTop: scale(49),
  },
  list: {
    marginTop: scale(9),
  },
});