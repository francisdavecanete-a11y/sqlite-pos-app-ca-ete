/**
 * Design tokens extracted from the Figma file
 * (https://www.figma.com/design/hpPmLJ8C1QzSboiz8zoVOE)
 *
 * Every colour below is copied verbatim from a node fill in the file,
 * and every font family/weight matches the text styles used in the frames.
 */

export const colors = {
  // Brand
  primary: '#0E5C63', // hero sales card, primary buttons, active "All" chip
  primaryDark: '#0A4046', // active tab pill, active bar in reports chart
  primaryLight: '#2E7D84', // chips inside the hero sales card
  successTint: '#DDF1EC', // avatar tiles, selected payment row, inactive bars

  // Surfaces
  background: '#F4F7F7', // screen background
  surface: '#FFFFFF', // cards
  border: '#E3EAEB', // card / input / tab bar borders
  divider: '#E5E5EA', // dashed style rule in the POS summary

  // Text
  text: '#17262B', // primary label colour
  black: '#000000', // screen titles, quantities, keypad digits
  textSecondary: '#6B7C82', // supporting copy
  textMuted: '#8E8E93', // subtitles, axis labels, timestamps

  // Status
  danger: '#D64545',
  dangerTint: '#F2BEBE',
  warning: '#F2A541',
  warningTint: '#F4D9B7',
  positive: '#4CB166',
  positiveTint: '#B3F2C3',
  change: '#269742',
};

export const fonts = {
  // "Plus Jakarta Sans" — used for nearly all UI copy in the file
  pjs: {
    regular: 'PlusJakartaSans_400Regular',
    medium: 'PlusJakartaSans_500Medium',
    semibold: 'PlusJakartaSans_600SemiBold',
    bold: 'PlusJakartaSans_700Bold',
    extrabold: 'PlusJakartaSans_800ExtraBold',
  },
  // "Inter" — used for screen titles, subtitles, search fields and chips
  inter: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
};

export const radii = {
  badge: 5,
  tile: 10, // avatar tiles + tab bar icon boxes
  card: 15, // product cards, inputs, chips, buttons
  hero: 20, // sales hero + chart card
};

/**
 * The Figma frames are not perfectly centred: content starts 14px in and ends
 * 20px from the right edge (356px wide cards), while the search fields and the
 * POS charge button start at 11px. Those exact numbers are kept here so every
 * card lines up with the mockup.
 */
export const layout = {
  cardLeft: 14,
  cardWidth: 356,
  fieldLeft: 11,
  fieldWidth: 356,
  chartLeft: 17,
  chartWidth: 348,
  statGap: 18,
  statWidth: 171,
};

export const fontAssets = {
  PlusJakartaSans_400Regular: require('@expo-google-fonts/plus-jakarta-sans/400Regular/PlusJakartaSans_400Regular.ttf'),
  PlusJakartaSans_500Medium: require('@expo-google-fonts/plus-jakarta-sans/500Medium/PlusJakartaSans_500Medium.ttf'),
  PlusJakartaSans_600SemiBold: require('@expo-google-fonts/plus-jakarta-sans/600SemiBold/PlusJakartaSans_600SemiBold.ttf'),
  PlusJakartaSans_700Bold: require('@expo-google-fonts/plus-jakarta-sans/700Bold/PlusJakartaSans_700Bold.ttf'),
  PlusJakartaSans_800ExtraBold: require('@expo-google-fonts/plus-jakarta-sans/800ExtraBold/PlusJakartaSans_800ExtraBold.ttf'),
  Inter_400Regular: require('@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf'),
  Inter_500Medium: require('@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf'),
  Inter_600SemiBold: require('@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf'),
  Inter_700Bold: require('@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf'),
};

export default { colors, fonts, radii, layout, fontAssets };