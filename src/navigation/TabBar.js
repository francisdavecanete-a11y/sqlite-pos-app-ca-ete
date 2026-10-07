import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, radii } from '../../theme';
import { scale } from '../utils/scale';
import { tabIcons } from '../components/icons';

/**
 * Custom bottom tab bar matching the Figma tab strip: a 70px white bar with a
 * 1px top border, four 40x40 rounded icon tiles (active tile filled dark teal)
 * and a 9px label underneath.
 */
export default function TabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom, height: scale(70) + insets.bottom }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const Icon = tabIcons[route.name];

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.item}
            accessibilityRole="button"
            accessibilityLabel={route.name}
            accessibilityState={{ selected: focused }}>
            <View style={[styles.iconBox, focused && styles.iconBoxActive]}>
              {Icon ? <Icon size={scale(25)} color={focused ? colors.surface : colors.textSecondary} /> : null}
            </View>
            <Text style={styles.label}>{route.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: scale(9),
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  iconBox: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(radii.tile),
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxActive: {
    backgroundColor: colors.primaryDark,
    borderColor: colors.primaryDark,
  },
  label: {
    marginTop: scale(4),
    fontFamily: fonts.pjs.medium,
    fontSize: scale(9),
    lineHeight: scale(11),
    color: colors.textSecondary,
  },
});