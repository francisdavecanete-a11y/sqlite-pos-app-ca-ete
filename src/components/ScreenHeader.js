import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../../theme';
import { scale } from '../utils/scale';

export function ScreenHeader({ title, subtitle }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

export function SectionHeader({ title, action, onPress, compact = false }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, compact && styles.sectionTitleCompact]}>{title}</Text>
      {action ? (
        <Text style={styles.sectionAction} onPress={onPress}>
          {action}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: scale(14),
    paddingTop: scale(14),
  },
  title: {
    fontFamily: fonts.inter.bold,
    fontSize: scale(20),
    lineHeight: scale(24),
    color: colors.black,
  },
  subtitle: {
    fontFamily: fonts.inter.regular,
    fontSize: scale(11),
    lineHeight: scale(13),
    color: colors.textMuted,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(14),
  },
  sectionTitle: {
    fontFamily: fonts.pjs.semibold,
    fontSize: scale(15),
    lineHeight: scale(19),
    color: colors.text,
  },
  sectionTitleCompact: {
    fontFamily: fonts.pjs.bold,
    fontSize: scale(13),
    lineHeight: scale(16),
    color: colors.black,
  },
  sectionAction: {
    fontFamily: fonts.inter.bold,
    fontSize: scale(11),
    lineHeight: scale(13),
    color: colors.primary,
  },
});