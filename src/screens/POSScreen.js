import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, layout, radii } from '../../theme';
import { scale } from '../utils/scale';
import { AvatarTile } from '../components/Card';
import { PrimaryButton, SearchField } from '../components/Controls';
import { ScreenHeader } from '../components/ScreenHeader';
import StatusBar from '../components/StatusBar';
import { useCart } from '../context/CartContext';
import { inventoryItems } from '../data/inventory';

function StepperButton({ label, onPress }) {
  return (
    <Pressable style={styles.stepButton} onPress={onPress} hitSlop={8}>
      <Text style={styles.stepLabel}>{label}</Text>
    </Pressable>
  );
}

function CartRow({ item, onIncrement, onDecrement }) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <AvatarTile letter={item.initial} />
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₱{item.unitPrice.toLocaleString('en-PH')} each</Text>
      </View>
      <View style={styles.stepper}>
        <StepperButton label="-" onPress={onDecrement} />
        <Text style={styles.quantity}>{item.quantity}</Text>
        <StepperButton label="+" onPress={onIncrement} />
      </View>
    </View>
  );
}

function SummaryRow({ label, value, valueStyle }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValue, valueStyle]}>{value}</Text>
    </View>
  );
}

export default function POSScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { items, itemCount, orderNumber, subtotal, discount, vat, total, updateQuantity, addItem } = useCart();
  const [query, setQuery] = useState('');

  const matches = inventoryItems.filter((item) => {
    const needle = query.trim().toLowerCase();
    if (!needle) return false;
    return item.name.toLowerCase().includes(needle) || item.sku.toLowerCase().includes(needle);
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar />
      <View style={styles.flex}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <ScreenHeader
            title="New sale"
            subtitle={`Order #${orderNumber} · ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
          />

          <SearchField
            placeholder="Scan barcode or search item"
            value={query}
            onChangeText={setQuery}
            withBarcode
            style={styles.search}
          />

          <View style={styles.list}>
            {items.map((item) => (
              <CartRow
                key={item.id}
                item={item}
                onIncrement={() => updateQuantity(item.id, 1)}
                onDecrement={() => updateQuantity(item.id, -1)}
              />
            ))}
          </View>

          <View style={styles.summary}>
            <SummaryRow label="Subtotal" value={`₱${subtotal.toLocaleString('en-PH')}`} />
            <SummaryRow label="Discount" value={`-₱${discount.toLocaleString('en-PH')}`} />
            <SummaryRow label="VAT (12%)" value={`₱${vat.toLocaleString('en-PH')}`} />
            <View style={styles.dashedRule} />
            <SummaryRow
              label="Total"
              value={`₱${total.toLocaleString('en-PH')}`}
              valueStyle={styles.summaryTotal}
            />
          </View>

          {matches.length > 0 ? (
            <View style={styles.matches}>
              {matches.slice(0, 3).map((item) => (
                <Pressable key={item.id} style={styles.matchRow} onPress={() => addItem(item)}>
                  <AvatarTile letter={item.initial} size={32} fontSize={13} />
                  <Text style={styles.matchText}>{item.name}</Text>
                  <Text style={styles.matchPrice}>{item.price}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </ScrollView>

        <PrimaryButton
          label={`Charge ₱${total.toLocaleString('en-PH')}`}
          onPress={() => navigation.navigate('Payment')}
          style={{ marginBottom: scale(24) + insets.bottom }}
        />
      </View>
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
    paddingBottom: scale(18),
  },
  search: {
    marginTop: scale(17),
  },
  list: {
    marginTop: scale(14),
  },
row: {
    height: scale(65),
    width: scale(layout.cardWidth),
    marginLeft: scale(layout.cardLeft),
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: scale(radii.card),
    marginBottom: scale(14),
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
  price: {
    fontFamily: fonts.pjs.medium,
    fontSize: scale(11),
    lineHeight: scale(14),
    color: colors.textSecondary,
  },
  stepper: {
    width: scale(81),
    height: scale(15),
    marginRight: scale(13),
    justifyContent: 'center',
  },
  stepButton: {
    position: 'absolute',
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
  quantity: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: fonts.pjs.bold,
    fontSize: scale(11),
    lineHeight: scale(15),
    color: colors.black,
  },
summary: {
    marginLeft: scale(layout.cardLeft),
    width: scale(layout.cardWidth),
    height: scale(117),
    borderRadius: scale(radii.card),
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingLeft: scale(10),
    paddingRight: scale(15),
    paddingTop: scale(14),
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: scale(18),
  },
  summaryLabel: {
    fontFamily: fonts.pjs.medium,
    fontSize: scale(11),
    lineHeight: scale(14),
    color: colors.textSecondary,
  },
  summaryValue: {
    fontFamily: fonts.pjs.medium,
    fontSize: scale(11),
    lineHeight: scale(14),
    color: colors.textSecondary,
  },
  summaryTotal: {
    fontFamily: fonts.pjs.bold,
    fontSize: scale(15),
    lineHeight: scale(19),
    color: colors.text,
  },
dashedRule: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.divider,
    marginTop: scale(9),
    marginBottom: scale(8),
  },
  matches: {
    marginLeft: scale(layout.cardLeft),
    width: scale(layout.cardWidth),
    marginTop: scale(10),
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    paddingVertical: scale(6),
    paddingHorizontal: scale(10),
    borderRadius: scale(radii.card),
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: scale(6),
  },
  matchText: {
    flex: 1,
    fontFamily: fonts.pjs.medium,
    fontSize: scale(11),
    color: colors.text,
  },
matchPrice: {
    fontFamily: fonts.pjs.bold,
    fontSize: scale(11),
    color: colors.text,
  },
});