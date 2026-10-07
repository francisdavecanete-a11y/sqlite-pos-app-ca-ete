import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { colors, fonts } from '../../theme';
import { scale } from '../utils/scale';

const BARS = [7, 11, 15, 16];

/**
 * Reproduces the iOS status bar baked into every Figma frame:
 * "9:41" on the left, "5G" plus the signal image on the right.
 */
export default function StatusBar() {
  return (
    <View style={styles.container} pointerEvents="none">
      <Text style={styles.time}>9:41</Text>
      <View style={styles.right}>
        <Text style={styles.network}>5G</Text>
        <Svg width={scale(27)} height={scale(16)} viewBox="0 0 27 16">
          {BARS.map((height, index) => (
            <Rect
              key={index}
              x={index * 6.5}
              y={16 - height}
              width={4.5}
              height={height}
              rx={1.4}
              fill={colors.black}
            />
          ))}
          <Rect x={26} y={3} width={1} height={10} rx={0.5} fill={colors.black} opacity="0.25" />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: scale(28),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(14),
  },
  time: {
    fontFamily: fonts.pjs.semibold,
    fontSize: scale(12),
    color: colors.black,
    marginTop: scale(-4),
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
  },
  network: {
    fontFamily: fonts.pjs.semibold,
    fontSize: scale(12),
    color: colors.black,
  },
});