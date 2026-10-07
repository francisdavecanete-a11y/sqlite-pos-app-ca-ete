import { Dimensions, PixelRatio } from 'react-native';

// The Figma frames are iPhone 13/14 sized (390 x 844).
export const DESIGN_WIDTH = 390;

const screenWidth = Dimensions.get('window').width;
const factor = screenWidth / DESIGN_WIDTH;

export function scale(value) {
  return PixelRatio.roundToNearestPixel(value * factor);
}