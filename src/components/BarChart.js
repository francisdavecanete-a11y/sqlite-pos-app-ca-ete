import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, layout, radii } from '../../theme';
import { scale } from '../utils/scale';

/**
 * Weekly sales bar chart from the Reports frame:
 * seven rounded-top bars, the active day highlighted in the dark brand colour.
 */
export default function BarChart({ label, value, days, activeIndex }) {
  const maxHeight = days.reduce((max, day) => Math.max(max, day.height), 0);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>

      <View style={styles.plot}>
        {days.map((day, index) => (
          <View key={day.day} style={styles.column}>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.bar,
                  index === activeIndex && styles.barActive,
                  { height: scale((day.height / maxHeight) * 100) },
                ]}
              />
            </View>
            <Text style={[styles.day, index === activeIndex && styles.dayActive]}>{day.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginLeft: scale(layout.chartLeft),
    width: scale(layout.chartWidth),
    marginTop: scale(22),
    height: scale(201),
    borderRadius: scale(radii.hero),
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingTop: scale(8),
    paddingHorizontal: scale(17),
  },
  label: {
    fontFamily: fonts.inter.regular,
    fontSize: scale(10),
    lineHeight: scale(12),
    color: colors.textMuted,
  },
  value: {
    marginTop: scale(3),
    fontFamily: fonts.pjs.bold,
    fontSize: scale(14),
    lineHeight: scale(18),
    color: colors.text,
  },
  plot: {
    height: scale(126),
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: scale(12),
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  barTrack: {
    height: scale(112),
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: scale(30),
    borderTopLeftRadius: scale(radii.tile),
    borderTopRightRadius: scale(radii.tile),
    backgroundColor: colors.successTint,
  },
  barActive: {
    backgroundColor: colors.primaryDark,
  },
  day: {
    marginTop: scale(2),
    fontFamily: fonts.inter.regular,
    fontSize: scale(10),
    lineHeight: scale(12),
    color: colors.textMuted,
  },
  dayActive: {
    color: colors.primaryDark,
    fontFamily: fonts.pjs.semibold,
  },
});