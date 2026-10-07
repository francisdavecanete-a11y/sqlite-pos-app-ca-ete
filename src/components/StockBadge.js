import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radii } from '../../theme';
import { scale } from '../utils/scale';

const TONES = {
  danger: { background: colors.dangerTint, text: colors.danger },
  warning: { background: colors.warningTint, text: colors.warning },
  positive: { background: colors.positiveTint, text: colors.positive },
};

/**
 * Small pill used for the stock counters in Dashboard ("4 left"),
 * Inventory ("240 in stock") and the POS cart.
 */
export function StockBadge({ label, tone = 'danger', style, compact = false }) {
  const palette = TONES[tone] ?? TONES.danger;
  return (
    <View style={[styles.badge, compact && styles.badgeCompact, { backgroundColor: palette.background }, style]}>
      <Text style={[styles.label, compact && styles.labelCompact, { color: palette.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: scale(radii.badge),
    paddingHorizontal: scale(6),
    height: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCompact: {
    height: scale(18),
    paddingHorizontal: scale(9),
    borderRadius: scale(9),
  },
  label: {
    fontFamily: fonts.pjs.semibold,
    fontSize: scale(9),
    lineHeight: scale(11),
  },
  labelCompact: {
    fontSize: scale(10),
    lineHeight: scale(12),
  },
});