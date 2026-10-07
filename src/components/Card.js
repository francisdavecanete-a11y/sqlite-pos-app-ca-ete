import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radii } from '../../theme';
import { scale } from '../utils/scale';

/** 45x45 rounded tile holding the product initial (Dashboard / Inventory / POS / Reports). */
export function AvatarTile({ letter, size = 45, background = colors.successTint, color = colors.primaryDark, fontSize = 16 }) {
  return (
    <View
      style={[
        styles.tile,
        {
          width: scale(size),
          height: scale(size),
          borderRadius: scale(radii.tile),
          backgroundColor: background,
        },
      ]}>
      <Text
        style={{
          fontFamily: fonts.pjs.bold,
          fontSize: scale(fontSize),
          color,
        }}>
        {letter}
      </Text>
    </View>
  );
}

export function Card({ children, style, radius = radii.card, padded = true }) {
  return (
    <View
      style={[
        styles.card,
        { borderRadius: scale(radius) },
        padded && styles.cardPadded,
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardPadded: {
    padding: scale(16),
  },
});