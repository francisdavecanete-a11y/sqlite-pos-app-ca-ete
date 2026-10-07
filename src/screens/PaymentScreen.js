import React, { useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, layout, radii } from '../../theme';
import { scale } from '../utils/scale';
import { AvatarTile } from '../components/Card';
import { PrimaryButton } from '../components/Controls';
import { ScreenHeader } from '../components/ScreenHeader';
import StatusBar from '../components/StatusBar';
import { useCart } from '../context/CartContext';
import { paymentMethods } from '../data/inventory';

function Radio({ selected }) {
  return (
    <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected ? <View style={styles.radioInner} /> : null}
    </View>
  );
}

function PaymentMethodRow({ method, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.methodRow, selected && styles.methodRowSelected]}
      accessibilityRole="radio"
      accessibilityState={{ selected }}>
      <View style={styles.methodAvatar}>
        <AvatarTile
          letter={method.letter}
          background={selected ? colors.surface : colors.successTint}
          color={colors.primary}
          fontSize={24}
        />
      </View>
      <Text style={styles.methodLabel}>{method.label}</Text>
      <Radio selected={selected} />
    </Pressable>
  );
}

function MoneyRow({ label, value, valueColor = colors.text }) {
  return (
    <View style={styles.moneyRow}>
      <Text style={styles.moneyLabel}>{label}</Text>
      <Text style={[styles.moneyValue, { color: valueColor }]}>{value}</Text>
    </View>
  );
}

/**
 * The keypad drawn in the Figma frame only carries 1-6, so round amounts such
 * as ₱2,000 cannot be keyed in. Tapping the amount opens the system keypad for
 * direct entry; the row is visually identical to the static design otherwise.
 */
function EditableAmount({ label, raw, formatted, onChange, onFinishEditing }) {
  const [editing, setEditing] = useState(false);

  return (
    <View style={styles.moneyRow}>
      <Text style={styles.moneyLabel}>{label}</Text>
      {editing ? (
        <TextInput
          style={styles.moneyInput}
          value={raw}
          onChangeText={onChange}
          keyboardType="number-pad"
          autoFocus
          maxLength={7}
          onBlur={() => {
            setEditing(false);
            onFinishEditing();
          }}
        />
      ) : (
        <Pressable
          onPress={() => setEditing(true)}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={`Edit ${label}`}>
          <Text style={styles.moneyValue}>{formatted}</Text>
        </Pressable>
      )}
    </View>
  );
}

function KeypadKey({ digit, onPress }) {
  return (
    <Pressable
      onPress={() => onPress(digit)}
      style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}>
      <Text style={styles.keyLabel}>{digit}</Text>
    </Pressable>
  );
}

export default function PaymentScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { orderNumber, total, clearCart } = useCart();
  const [method, setMethod] = useState('cash');
  const [cashInput, setCashInput] = useState('');

  const received = method === 'cash' && cashInput ? Number(cashInput.replace(/[^\d]/g, '')) || 0 : 0;
  const change = Math.max(0, received - total);
  const canConfirm = method !== 'cash' || received >= total;

  const pressDigit = (digit) => {
    if (method !== 'cash') return;
    const next = `${cashInput}${digit}`.replace(/^0+(?=\d)/, '').slice(0, 7);
    setCashInput(next);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar />
      <View style={styles.flex}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <ScreenHeader title="Payment" subtitle={`Order #${orderNumber}`} />

          <View style={styles.amountCard}>
            <Text style={styles.amountLabel}>Amount due</Text>
            <Text style={styles.amountValue}>
              ₱{total.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Payment method</Text>

          <View style={styles.methods}>
            {paymentMethods.map((option) => (
              <PaymentMethodRow
                key={option.id}
                method={option}
                selected={option.id === method}
                onPress={() => setMethod(option.id)}
              />
            ))}
          </View>

{method === 'cash' ? (
            <View style={styles.cashSummary}>
              <EditableAmount
                label="Cash received"
                raw={cashInput}
                formatted={`₱${(received || 0).toLocaleString('en-PH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
                onChange={(next) => setCashInput(next.replace(/[^\d]/g, '').slice(0, 7))}
                onFinishEditing={() => Keyboard.dismiss()}
              />
              <MoneyRow
                label="Change"
                value={`₱${change.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                valueColor={colors.change}
              />
            </View>
          ) : null}

{method === 'cash' ? (
            <View style={styles.keypad}>
              {[1, 2, 3, 4, 5, 6].map((digit) => (
                <KeypadKey key={digit} digit={digit} onPress={pressDigit} />
              ))}
            </View>
          ) : null}

          <PrimaryButton
            label="Confirm payment"
            onPress={() => {
              clearCart();
              navigation.goBack();
            }}
            disabled={!canConfirm}
            style={[
              styles.confirm,
              { marginBottom: scale(27) + insets.bottom },
              !canConfirm && styles.confirmDisabled,
            ]}
            textStyle={styles.confirmLabel}
          />
        </ScrollView>
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
    flexGrow: 1,
  },
  amountCard: {
    marginLeft: scale(layout.cardLeft),
    width: scale(layout.cardWidth),
    marginTop: scale(17),
    height: scale(117),
    borderRadius: scale(radii.card),
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingTop: scale(28),
  },
  amountLabel: {
    fontFamily: fonts.pjs.semibold,
    fontSize: scale(11),
    lineHeight: scale(14),
    color: colors.surface,
  },
  amountValue: {
    marginTop: scale(4),
    fontFamily: fonts.pjs.extrabold,
    fontSize: scale(24),
    lineHeight: scale(30),
    color: colors.surface,
  },
sectionTitle: {
    fontFamily: fonts.pjs.extrabold,
    fontSize: scale(12),
    lineHeight: scale(15),
    color: colors.black,
    marginLeft: scale(layout.cardLeft),
    marginTop: scale(17),
  },
  methods: {
    marginTop: scale(12),
  },
  methodRow: {
    height: scale(65),
    marginLeft: scale(layout.cardLeft),
    width: scale(layout.cardWidth),
    marginBottom: scale(12),
    borderRadius: scale(radii.card),
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodRowSelected: {
    backgroundColor: colors.successTint,
  },
  methodAvatar: {
    marginLeft: scale(9),
  },
  methodLabel: {
    flex: 1,
    marginLeft: scale(12),
    fontFamily: fonts.pjs.semibold,
    fontSize: scale(12),
    lineHeight: scale(15),
    color: colors.text,
  },
  radio: {
    width: scale(15),
    height: scale(15),
    borderRadius: scale(8),
    marginRight: scale(18),
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  radioInner: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(4),
    backgroundColor: colors.surface,
  },
cashSummary: {
    marginLeft: scale(layout.cardLeft),
    width: scale(layout.cardWidth),
    marginTop: scale(15),
    paddingLeft: scale(16),
    paddingRight: scale(11),
  },
  moneyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(4),
  },
  moneyLabel: {
    fontFamily: fonts.pjs.semibold,
    fontSize: scale(11),
    lineHeight: scale(14),
    color: colors.textMuted,
  },
moneyValue: {
    fontFamily: fonts.pjs.semibold,
    fontSize: scale(11),
    lineHeight: scale(14),
  },
  moneyInput: {
    flex: 1,
    textAlign: 'right',
    fontFamily: fonts.pjs.semibold,
    fontSize: scale(11),
    lineHeight: scale(14),
    color: colors.text,
    padding: 0,
  },
keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: scale(layout.cardLeft),
    width: scale(layout.cardWidth),
    marginTop: scale(36),
    marginBottom: scale(70),
    rowGap: scale(22),
  },
  key: {
    width: scale(110),
    height: scale(50),
    borderRadius: scale(radii.card),
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyPressed: {
    backgroundColor: colors.successTint,
  },
  keyLabel: {
    fontFamily: fonts.pjs.semibold,
    fontSize: scale(20),
    lineHeight: scale(25),
    color: colors.black,
  },
confirm: {
    flexShrink: 0,
    marginLeft: scale(layout.cardLeft),
    width: scale(layout.cardWidth),
    backgroundColor: colors.warning,
  },
  confirmDisabled: {
    opacity: 0.5,
  },
  confirmLabel: {
    fontFamily: fonts.pjs.medium,
    fontSize: scale(16),
    lineHeight: scale(20),
    color: colors.black,
  },
});