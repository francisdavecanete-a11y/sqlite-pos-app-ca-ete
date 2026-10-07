/**
 * Mock data mirroring the values shown in each Figma frame.
 */

import { colors } from '../../theme';

export const lowStockItems = [
  { id: 'rc-025', initial: 'R', name: 'Rice 25kg', sku: 'SKU RC-025', badge: '4 left', tone: 'danger' },
  { id: 'ol-001', initial: 'C', name: 'Cooking oil 1L', sku: 'SKU OL-001', badge: '6 left', tone: 'danger' },
  { id: 'sg-001', initial: 'S', name: 'Sugar 1kg', sku: 'SKU SG-001', badge: '12 left', tone: 'warning' },
];

export const inventoryItems = [
  {
    id: 'rc-025',
    initial: 'R',
    name: 'Rice 25kg',
    supplier: 'Golden Grains Go',
    sku: 'RC-025',
    price: '₱1,250',
    unitPrice: 1250,
    stock: 4,
    category: 'Grains',
  },
  {
    id: 'ol-001',
    initial: 'C',
    name: 'Cooking oil 1L',
    supplier: 'Palm Valley',
    sku: 'OL-001',
    price: '₱96',
    unitPrice: 96,
    stock: 6,
    category: 'Grains',
  },
  {
    id: 'sg-001',
    initial: 'S',
    name: 'Sugar 1kg',
    supplier: 'Sweet Mill',
    sku: 'SG-001',
    price: '₱78',
    unitPrice: 78,
    stock: 12,
    category: 'Grains',
  },
  {
    id: 'in-014',
    initial: 'M',
    name: 'Instant noodles',
    supplier: 'Noodle House',
    sku: 'IN-014',
    price: '₱14',
    unitPrice: 14,
    stock: 240,
    category: 'Beverages',
  },
  {
    id: 'bw-500',
    initial: 'W',
    name: 'Bottled water 500ml',
    supplier: 'Clear Springs',
    sku: 'BW-500',
    price: '₱18',
    unitPrice: 18,
    stock: 180,
    category: 'Beverages',
  },
  {
    id: 'eg-030',
    initial: 'E',
    name: 'Eggs tray (30)',
    supplier: 'Farm Fresh',
    sku: 'EG-030',
    price: '₱18',
    unitPrice: 18,
    stock: 36,
    category: 'Grains',
  },
];

export const inventoryFilters = [
  { label: 'All', match: () => true },
  { label: 'Low stock', match: (item) => item.stock <= 12 },
  { label: 'Beverages', match: (item) => item.category === 'Beverages' },
  { label: 'Grains', match: (item) => item.category === 'Grains' },
];

/** POS cart seeded exactly as in the "iPhone 13 & 14 - 3" frame. */
export const initialCart = [
  { ...inventoryItems[0], quantity: 1 },
  { ...inventoryItems[1], quantity: 2 },
  { ...inventoryItems[4], quantity: 6 },
];

export const ORDER_NUMBER = '#1043';

export const reportRanges = ['Today', 'This week', 'This month'];

export const weeklySales = {
  label: 'Total sales this week',
  value: '₱168,320',
  days: [
    { day: 'Mon', height: 67 },
    { day: 'Tue', height: 87 },
    { day: 'Wed', height: 57 },
    { day: 'Thu', height: 98 },
    { day: 'Fri', height: 121 },
    { day: 'Sat', height: 82 },
    { day: 'Sun', height: 46 },
  ],
  activeIndex: 4,
};

export const reportStats = [
  { label: 'Orders', value: '296' },
  { label: 'Avg. order', value: '₱569' },
];

export const topProducts = [
  { id: 'rc-025', initial: 'R', name: 'Rice 25kg', meta: '84 sold', value: '₱105,000' },
  { id: 'bw-500', initial: 'W', name: 'Bottled water 500ml', meta: '410 sold', value: '₱7,380' },
];

export const paymentMethods = [
  { id: 'cash', letter: '₱', label: 'Cash', background: colors.surface },
  { id: 'gcash', letter: 'G', label: 'GCash' },
  { id: 'card', letter: 'C', label: 'Card' },
];