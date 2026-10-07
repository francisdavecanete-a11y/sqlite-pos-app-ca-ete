import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('pos_inventory.db');

const SEED_PRODUCTS = [
  { name: 'Rice 25kg', category: 'Grains', price: 1250, stock: 4 },
  { name: 'Cooking oil 1L', category: 'Grains', price: 96, stock: 6 },
  { name: 'Sugar 1kg', category: 'Grains', price: 78, stock: 12 },
  { name: 'Instant noodles', category: 'Beverages', price: 14, stock: 240 },
  { name: 'Bottled water 500ml', category: 'Beverages', price: 18, stock: 180 },
];

export function initDatabase() {
  db.execSync('PRAGMA journal_mode = WAL;');
  db.execSync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    );
  `);

  const { count } = db.getFirstSync('SELECT COUNT(*) AS count FROM products');
  if (count === 0) {
    db.withTransactionSync(() => {
      for (const product of SEED_PRODUCTS) {
        db.runSync('INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)', [
          product.name,
          product.category,
          product.price,
          product.stock,
        ]);
      }
    });
  }
}

export default db;