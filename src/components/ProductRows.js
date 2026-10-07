import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, layout, radii } from '../../theme';
import { scale } from '../utils/scale';
import { AvatarTile } from './Card';
import { StockBadge } from './StockBadge';
import { TrashIcon } from './icons';

const withGap = (gap) => ({ marginBottom: scale(gap) });

/** Dashboard → "Low stock items" list (65px card, name + SKU, single badge on the right). */
export function LowStockRow({ initial, name, meta, badge, tone, gap = 13 }) {
  return (
    <View style={[styles.row, withGap(gap)]}>
      <View style={styles.avatar}>
        <AvatarTile letter={initial} />
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.meta}>{meta}</Text>
      </View>
      <StockBadge label={badge} tone={tone} style={styles.trailing} />
    </View>
  );
}

/** Inventory → product list (65px card, price above the stock badge on the right). */
export function InventoryRow({
  initial,
  name,
  supplier,
  price,
  badge,
  tone,
  gap = 11,
  stock,
  onIncrement,
  onDecrement,
  onDelete,
}) {
  const interactive = Boolean(onDelete || onIncrement || onDecrement);
  return (
    <View style={[styles.row, withGap(gap)]}>
      <View style={styles.avatar}>
        <AvatarTile letter={initial} />
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.meta}>{supplier}</Text>
      </View>
      {onIncrement || onDecrement ? (
        <View style={styles.stepper}>
          <Pressable style={styles.stepButton} onPress={onDecrement} hitSlop={6}>
            <Text style={styles.stepLabel}>−</Text>
          </Pressable>
          <Text style={styles.stepQuantity}>{stock}</Text>
          <Pressable style={styles.stepButton} onPress={onIncrement} hitSlop={6}>
            <Text style={styles.stepLabel}>+</Text>
          </Pressable>
        </View>
      ) : null}
      <View style={[styles.trailingColumn, interactive && styles.trailingColumnInteractive]}>
        <Text style={styles.price}>{price}</Text>
        <StockBadge label={badge} tone={tone} style={styles.badgeRight} />
      </View>
      {onDelete ? (
        <Pressable style={styles.deleteButton} onPress={onDelete} hitSlop={8}>
          <TrashIcon size={scale(14)} color={colors.danger} />
        </Pressable>
      ) : null}
    </View>
  );
}

/** Reports → "Top products" list (65px card, sold count on the left, revenue on the right). */
export function TopProductRow({ initial, name, meta, value, gap = 14 }) {
  return (
    <View style={[styles.row, withGap(gap)]}>
      <View style={styles.avatar}>
        <AvatarTile letter={initial} />
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.meta}>{meta}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: scale(65),
    width: scale(layout.cardWidth),
    marginLeft: scale(layout.cardLeft),
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: scale(radii.card),
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: scale(9),
  },
  body: {
    flex: 1,
    marginLeft: scale(13),
  },
  name: {
    fontFamily: fonts.pjs.medium,
    fontSize: scale(11),
    lineHeight: scale(14),
    color: colors.text,
  },
  meta: {
    fontFamily: fonts.pjs.medium,
    fontSize: scale(11),
    lineHeight: scale(14),
    color: colors.textSecondary,
  },
  trailing: {
    marginRight: scale(13),
  },
  trailingColumn: {
    alignItems: 'flex-end',
    marginRight: scale(10),
    minWidth: scale(41),
  },
  trailingColumnInteractive: {
    marginRight: scale(30),
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginRight: scale(8),
  },
  stepButton: {
    width: scale(15),
    height: scale(15),
    borderRadius: scale(radii.badge),
    backgroundColor: colors.successTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontFamily: fonts.pjs.bold,
    fontSize: scale(11),
    lineHeight: scale(14),
    color: colors.primaryDark,
  },
  stepQuantity: {
    fontFamily: fonts.pjs.bold,
    fontSize: scale(11),
    lineHeight: scale(14),
    color: colors.black,
    minWidth: scale(20),
    textAlign: 'center',
  },
  deleteButton: {
    position: 'absolute',
    right: scale(8),
    top: 0,
    bottom: 0,
    width: scale(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeRight: {
    marginTop: scale(1),
  },
  price: {
    fontFamily: fonts.pjs.bold,
    fontSize: scale(11),
    lineHeight: scale(14),
    color: colors.text,
  },
  value: {
    fontFamily: fonts.pjs.bold,
    fontSize: scale(11),
    lineHeight: scale(14),
    color: colors.text,
    marginRight: scale(14),
  },
});