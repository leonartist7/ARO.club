import { characters, accessories } from './characters';

/**
 * The one shop catalog.
 *
 * The shop and the character builder used to describe items completely
 * differently (`price_points`/`level_required` from a Supabase table vs
 * `cost` from characters.js), which meant buying a hat in one place did
 * nothing in the other. Both now read this list and share one inventory.
 */

/**
 * Inventory keys are namespaced by category. "star" exists as both a pair of
 * glasses and an accessory - without the prefix, buying one would unlock the
 * other.
 */
export const inventoryKey = (category, itemId) => `${category}:${itemId}`;

/** Which equipped slot a category fills. `null` = owned but not worn. */
export const CATEGORY_SLOT = {
  characters: 'character',
  hats: 'hat',
  glasses: 'glasses',
  accessories: 'accessory',
  backgrounds: 'background',
  furniture: null,
  decorations: null,
};

export const SHOP_CATEGORIES = [
  { id: 'all', name: 'All Items', icon: '🛍️' },
  { id: 'characters', name: 'Characters', icon: '🦉' },
  { id: 'hats', name: 'Hats', icon: '🎩' },
  { id: 'glasses', name: 'Glasses', icon: '😎' },
  { id: 'accessories', name: 'Accessories', icon: '⭐' },
  { id: 'backgrounds', name: 'Backgrounds', icon: '🌅' },
  { id: 'furniture', name: 'Furniture', icon: '🛋️' },
  { id: 'decorations', name: 'Decorations', icon: '🪴' },
];

/** Room items - owned and displayed, but not worn by the avatar. */
const roomItems = [
  { id: 'couch', name: 'Comfy Couch', icon: '🛋️', cost: 400, category: 'furniture', levelRequired: 2 },
  { id: 'desk', name: 'Study Desk', icon: '🪑', cost: 300, category: 'furniture', levelRequired: 1 },
  { id: 'bookshelf', name: 'Bookshelf', icon: '📚', cost: 350, category: 'furniture', levelRequired: 2 },
  { id: 'piano', name: 'Grand Piano', icon: '🎹', cost: 900, category: 'furniture', levelRequired: 4 },
  { id: 'gaming', name: 'Gaming Setup', icon: '🖥️', cost: 800, category: 'furniture', levelRequired: 3 },
  { id: 'lamp', name: 'Cosy Lamp', icon: '💡', cost: 150, category: 'furniture', levelRequired: 1 },
  { id: 'plant', name: 'Potted Plant', icon: '🪴', cost: 120, category: 'decorations', levelRequired: 1 },
  { id: 'art', name: 'Wall Art', icon: '🖼️', cost: 250, category: 'decorations', levelRequired: 2 },
  { id: 'fishtank', name: 'Fish Tank', icon: '🐠', cost: 600, category: 'decorations', levelRequired: 3 },
  { id: 'globe', name: 'World Globe', icon: '🌍', cost: 200, category: 'decorations', levelRequired: 1 },
  { id: 'candles', name: 'Scented Candles', icon: '🕯️', cost: 100, category: 'decorations', levelRequired: 1 },
  { id: 'trophy-shelf', name: 'Trophy Shelf', icon: '🏆', cost: 750, category: 'decorations', levelRequired: 4 },
];

/** Level gate derived from price, so pricier gear feels like a goal. */
const levelForCost = (cost) => (cost >= 1500 ? 4 : cost >= 750 ? 3 : cost >= 300 ? 2 : 1);

/** Normalise everything into one shape: { id, name, icon, cost, category }. */
const fromCharacters = characters.map((item) => ({
  id: item.id,
  name: item.name,
  icon: item.emoji,
  cost: item.cost,
  category: 'characters',
  levelRequired: levelForCost(item.cost),
}));

const fromAccessories = Object.entries(accessories).flatMap(([category, items]) =>
  items.map((item) => ({
    id: item.id,
    name: item.name,
    icon: item.emoji,
    cost: item.cost,
    category,
    levelRequired: levelForCost(item.cost),
  }))
);

export const SHOP_ITEMS = [...fromCharacters, ...fromAccessories, ...roomItems];

/** Items in a category, or everything when `all`. */
export const itemsInCategory = (category) =>
  category === 'all'
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter((item) => item.category === category);

/** Free starter gear counts as owned without sitting in the inventory. */
export const isStarterItem = (item) => item.cost === 0;
