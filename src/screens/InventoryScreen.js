import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts, layout, radii } from '../../theme';
import { scale } from '../utils/scale';
import { FilterChips, PrimaryButton, SearchField } from '../components/Controls';
import { InventoryRow } from '../components/ProductRows';
import { ScreenHeader } from '../components/ScreenHeader';
import StatusBar from '../components/StatusBar';
import db, { initDatabase } from '../services/db';

const inventoryFilters = [
  { label: 'All', match: () => true },
  { label: 'Low stock', match: (item) => item.stock <= 12 },
  { label: 'Beverages', match: (item) => item.category === 'Beverages' },
  { label: 'Grains', match: (item) => item.category === 'Grains' },
];

const EMPTY_FORM = { name: '', category: '', price: '', stock: '' };

const formatPrice = (price) => `₱${price.toLocaleString('en-PH')}`;
const badgeTone = (stock) => (stock <= 6 ? 'danger' : stock <= 12 ? 'warning' : 'positive');
const badgeLabel = (stock) => (stock <= 12 ? `${stock} left` : `${stock} in stock`);

function FormField({ label, ...inputProps }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput style={styles.fieldInput} placeholderTextColor={colors.textSecondary} {...inputProps} />
    </View>
  );
}

export default function InventoryScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const loadProducts = useCallback((needle) => {
    const rows = needle
      ? db.getAllSync('SELECT * FROM products WHERE name LIKE ? ORDER BY name ASC', [`%${needle}%`])
      : db.getAllSync('SELECT * FROM products ORDER BY name ASC');
    setProducts(rows);
  }, []);

  useEffect(() => {
    initDatabase();
  }, []);

  useEffect(() => {
    loadProducts(query.trim());
  }, [query, loadProducts]);

  const items = useMemo(() => {
    const active = inventoryFilters.find((option) => option.label === filter) ?? inventoryFilters[0];
    return products.filter((item) => active.match(item));
  }, [filter, products]);

  const openModal = () => {
    setForm(EMPTY_FORM);
    setModalVisible(true);
  };

  const handleAdd = () => {
    const name = form.name.trim();
    const category = form.category.trim();
    const price = Number.parseFloat(form.price);
    const stock = Number.parseInt(form.stock, 10);

    if (!name || !category || Number.isNaN(price) || price <= 0 || Number.isNaN(stock) || stock < 0) {
      Alert.alert('Incomplete item', 'Please enter a name, category, a price above zero and a stock count.');
      return;
    }

    db.runSync('INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)', [
      name,
      category,
      price,
      stock,
    ]);
    setModalVisible(false);
    loadProducts(query.trim());
  };

  const confirmDelete = (item) => {
    Alert.alert('Delete product?', `Remove “${item.name}” from your inventory?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          db.runSync('DELETE FROM products WHERE id = ?', [item.id]);
          loadProducts(query.trim());
        },
      },
    ]);
  };

  const changeStock = (item, delta) => {
    const row = db.getFirstSync('SELECT stock FROM products WHERE id = ?', [item.id]);
    const next = Math.max(0, (row?.stock ?? 0) + delta);
    db.runSync('UPDATE products SET stock = ? WHERE id = ?', [next, item.id]);
    loadProducts(query.trim());
  };

  const renderRow = ({ item }) => (
    <InventoryRow
      initial={item.name.charAt(0).toUpperCase()}
      name={item.name}
      supplier={item.category}
      price={formatPrice(item.price)}
      badge={badgeLabel(item.stock)}
      tone={badgeTone(item.stock)}
      stock={item.stock}
      gap={11}
      onIncrement={() => changeStock(item, 1)}
      onDecrement={() => changeStock(item, -1)}
      onDelete={() => confirmDelete(item)}
    />
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar />
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderRow}
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <>
            <ScreenHeader
              title="Inventory"
              subtitle={`${items.length} product${items.length === 1 ? '' : 's'} stored on this device`}
            />

            <SearchField
              placeholder="Search products"
              value={query}
              onChangeText={setQuery}
              style={styles.search}
            />

            <FilterChips
              options={inventoryFilters.map((option) => ({ label: option.label }))}
              value={filter}
              onChange={setFilter}
              style={styles.filters}
            />

            <PrimaryButton label="Add item" onPress={openModal} style={styles.addButton} />
          </>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            No products match {query.trim() ? `“${query.trim()}”` : 'the selected filter'}.
          </Text>
        }
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add item</Text>

            <FormField
              label="Name"
              placeholder="e.g. Coffee 3-in-1"
              value={form.name}
              onChangeText={(value) => setForm((f) => ({ ...f, name: value }))}
            />
            <FormField
              label="Category"
              placeholder="e.g. Beverages"
              value={form.category}
              onChangeText={(value) => setForm((f) => ({ ...f, category: value }))}
            />
            <FormField
              label="Price (₱)"
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={form.price}
              onChangeText={(value) => setForm((f) => ({ ...f, price: value }))}
            />
            <FormField
              label="Stock"
              placeholder="0"
              keyboardType="number-pad"
              returnKeyType="done"
              value={form.stock}
              onChangeText={(value) => setForm((f) => ({ ...f, stock: value }))}
            />

            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, styles.modalCancel]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelLabel}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, styles.modalSubmit]} onPress={handleAdd}>
                <Text style={styles.modalSubmitLabel}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingBottom: scale(20),
  },
  search: {
    marginTop: scale(17),
  },
  filters: {
    marginTop: scale(6),
    gap: scale(8),
  },
  addButton: {
    marginTop: scale(12),
  },
  empty: {
    fontFamily: fonts.pjs.medium,
    fontSize: scale(11),
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: scale(20),
    marginLeft: scale(layout.cardLeft),
    width: scale(layout.cardWidth),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(23, 38, 43, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: scale(layout.cardWidth),
    borderRadius: scale(radii.card),
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: scale(18),
  },
  modalTitle: {
    fontFamily: fonts.pjs.bold,
    fontSize: scale(16),
    lineHeight: scale(20),
    color: colors.black,
    marginBottom: scale(14),
  },
  fieldWrap: {
    marginBottom: scale(12),
  },
  fieldLabel: {
    fontFamily: fonts.pjs.medium,
    fontSize: scale(11),
    lineHeight: scale(14),
    color: colors.textSecondary,
    marginBottom: scale(6),
  },
  fieldInput: {
    height: scale(38),
    borderRadius: scale(radii.card),
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: scale(14),
    fontFamily: fonts.inter.regular,
    fontSize: scale(12),
    color: colors.text,
  },
  modalActions: {
    flexDirection: 'row',
    gap: scale(10),
    marginTop: scale(6),
  },
  modalButton: {
    flex: 1,
    height: scale(44),
    borderRadius: scale(radii.card),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  modalCancelLabel: {
    fontFamily: fonts.pjs.bold,
    fontSize: scale(13),
    lineHeight: scale(16),
    color: colors.textSecondary,
  },
  modalSubmit: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  modalSubmitLabel: {
    fontFamily: fonts.pjs.bold,
    fontSize: scale(13),
    lineHeight: scale(16),
    color: colors.surface,
  },
});