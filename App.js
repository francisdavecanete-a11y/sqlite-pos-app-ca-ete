import React from 'react';
import { useFonts } from 'expo-font';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';
import { colors, fontAssets } from './theme';

export default function App() {
  const [fontsLoaded] = useFonts(fontAssets);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <CartProvider>
        <ExpoStatusBar style="dark" backgroundColor={colors.background} />
        <AppNavigator />
      </CartProvider>
    </SafeAreaProvider>
  );
}