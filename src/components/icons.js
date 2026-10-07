import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from '../../theme';

/**
 * The Figma file ships the four tab icons as raster images
 * ("Web", "In Inventory", "Cash Register", "Business Report").
 * They are redrawn here as vectors so they stay crisp and tintable.
 */

export function DashboardIcon({ size = 25, color = colors.textSecondary }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="7.5" height="7.5" rx="2" fill={color} />
      <Rect x="13.5" y="3" width="7.5" height="7.5" rx="2" fill={color} opacity={0.55} />
      <Rect x="3" y="13.5" width="7.5" height="7.5" rx="2" fill={color} opacity={0.55} />
      <Rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" fill={color} opacity={0.55} />
    </Svg>
  );
}

export function InventoryIcon({ size = 25, color = colors.textSecondary }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2.6 21 7v10l-9 4.4L3 17V7l9-4.4Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <Path d="M3.3 7 12 11.3 20.7 7" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <Path d="M12 11.3V21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

export function POSIcon({ size = 25, color = colors.textSecondary }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="5" width="18" height="11" rx="2.2" stroke={color} strokeWidth="1.8" />
      <Path d="M3 10h18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M7.5 13.2h.01M11 13.2h.01M14.5 13.2h.01" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <Path d="M5 16v3.2M19 16v3.2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M8.5 19.4h7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

export function ReportsIcon({ size = 25, color = colors.textSecondary }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 20.5h18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Rect x="4.5" y="12" width="4" height="6.5" rx="1.4" fill={color} opacity="0.5" />
      <Rect x="10" y="7" width="4" height="11.5" rx="1.4" fill={color} />
      <Rect x="15.5" y="3.5" width="4" height="15" rx="1.4" fill={color} opacity="0.75" />
    </Svg>
  );
}

export function SearchIcon({ size = 16, color = colors.textSecondary }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="6.5" stroke={color} strokeWidth="1.8" />
      <Path d="m16 16 4.5 4.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

export function BarcodeIcon({ size = 16, color = colors.textSecondary }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 6v12M7 6v12M10.5 6v12M15 6v12M18 6v12M21 6v12" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </Svg>
  );
}

export function TrashIcon({ size = 14, color = colors.danger }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 7h16M10 7V4h4v3M6.5 7 7.4 19a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4l.9-12"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M10 11v6M14 11v6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

export const tabIcons = {
  Dashboard: DashboardIcon,
  Inventory: InventoryIcon,
  POS: POSIcon,
  Reports: ReportsIcon,
};