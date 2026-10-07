import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, fonts, layout, radii } from '../../theme';
import { scale } from '../utils/scale';
import { BarcodeIcon, SearchIcon } from './icons';

/** Shared rounded search input (Inventory, POS). */
export function SearchField({ placeholder, value, onChangeText, withBarcode = false, style }) {
  return (
    <View style={[styles.search, style]}>
      {withBarcode ? (
        <BarcodeIcon size={scale(15)} color={colors.textSecondary} />
      ) : (
        <SearchIcon size={scale(15)} color={colors.textSecondary} />
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
    </View>
  );
}

/** Inventory → "All / Low stock / Beverages / Grains" pill row. */
export function FilterChips({ options, value, onChange, style }) {
  return (
    <View style={[styles.chipRow, style]}>
      {options.map((option) => {
        const active = option.label === value;
        return (
          <Pressable
            key={option.label}
            onPress={() => onChange(option.label)}
            style={[styles.chip, active && styles.chipActive]}>
            <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Reports → "Today / This week / This month" segmented control. */
export function SegmentedControl({ options, value, onChange, style }) {
  return (
    <View style={[styles.segmentRow, style]}>
      {options.map((option) => {
        const active = option.label === value;
        return (
          <Pressable
            key={option.label}
            onPress={() => onChange(option.label)}
            style={[styles.chip, active && styles.segmentActive]}>
            <Text style={[styles.chipLabel, active && styles.segmentLabelActive]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Filled brand button (POS "Charge", Payment "Confirm payment"). */
export function PrimaryButton({ label, onPress, style, textStyle, disabled = false }) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && !disabled && styles.buttonPressed,
      ]}>
      <Text style={[styles.buttonLabel, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  search: {
    height: scale(36),
    marginLeft: scale(layout.fieldLeft),
    width: scale(layout.fieldWidth),
    borderRadius: scale(radii.card),
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(14),
    gap: scale(9),
  },
  input: {
    flex: 1,
    fontFamily: fonts.inter.regular,
    fontSize: scale(11),
    color: colors.text,
    padding: 0,
  },
  chipRow: {
    flexDirection: 'row',
    marginLeft: scale(layout.cardLeft),
    gap: scale(8),
  },
  segmentRow: {
    flexDirection: 'row',
    marginLeft: scale(20),
    gap: scale(14),
  },
  chip: {
    height: scale(25),
    paddingHorizontal: scale(14),
    borderRadius: scale(radii.card),
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipLabel: {
    fontFamily: fonts.inter.medium,
    fontSize: scale(12),
    lineHeight: scale(15),
    color: colors.textSecondary,
  },
  chipLabelActive: {
    color: colors.surface,
  },
  segmentActive: {
    backgroundColor: colors.primaryDark,
    borderColor: colors.primaryDark,
  },
  segmentLabelActive: {
    color: colors.surface,
  },
  button: {
    height: scale(50),
    marginLeft: scale(layout.fieldLeft),
    width: scale(layout.fieldWidth),
    borderRadius: scale(radii.card),
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonLabel: {
    fontFamily: fonts.pjs.bold,
    fontSize: scale(15),
    lineHeight: scale(19),
    color: colors.surface,
  },
});