import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Lock, Sparkles, ShoppingBag, Coins } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';
import { usePlayerStore, usePlayerLevel } from '../store/usePlayerStore';
import {
  SHOP_CATEGORIES,
  CATEGORY_SLOT,
  itemsInCategory,
  inventoryKey,
  isStarterItem,
} from '../data/shop';

/**
 * The shop.
 *
 * Points spent here come from the same store that games pay into, and
 * anything wearable lands in the loadout the character builder and dashboard
 * read from. Buy a crown, see it on your owl - that's the loop.
 */
export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [justPurchased, setJustPurchased] = useState(null);
  const [deniedItem, setDeniedItem] = useState(null);

  const points = usePlayerStore((state) => state.points);
  const inventory = usePlayerStore((state) => state.inventory);
  const equipped = usePlayerStore((state) => state.equipped);
  const buyItem = usePlayerStore((state) => state.buyItem);
  const equip = usePlayerStore((state) => state.equipItem);
  const level = usePlayerLevel();

  const items = itemsInCategory(selectedCategory);

  const owns = (item) =>
    isStarterItem(item) || inventory.includes(inventoryKey(item.category, item.id));

  const isEquipped = (item) => {
    const slot = CATEGORY_SLOT[item.category];
    return slot ? equipped[slot] === item.id : false;
  };

  const handleBuy = (item) => {
    if (level.level < item.levelRequired) {
      setDeniedItem({ item, reason: `Reach level ${item.levelRequired} to unlock this` });
      return;
    }

    const bought = buyItem({ id: inventoryKey(item.category, item.id), cost: item.cost });

    if (!bought) {
      setDeniedItem({
        item,
        reason: `You need ${item.cost - points} more points`,
      });
      return;
    }

    // Wearables equip themselves so the reward is immediate.
    const slot = CATEGORY_SLOT[item.category];
    if (slot) equip(slot, item.id);
    setJustPurchased(item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-primary-500 shrink-0" />
              Shop
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Spend your points on gear for your character and room.
            </p>
          </div>

          {/* Balance */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur shadow-lg border border-white/40 dark:border-gray-700/40">
              <Coins className="w-5 h-5 text-primary-500" />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={points}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  className="text-xl font-bold text-gray-900 dark:text-white tabular-nums"
                >
                  {points}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm text-gray-500 dark:text-gray-400">points</span>
            </div>
            <Link to="/games">
              <Button variant="primary" size="sm">
                Earn more
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {SHOP_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white shadow-lg scale-105'
                  : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800'
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item, index) => {
            const owned = owns(item);
            const worn = isEquipped(item);
            const locked = level.level < item.levelRequired;
            const affordable = points >= item.cost;
            const slot = CATEGORY_SLOT[item.category];

            return (
              <motion.div
                key={`${item.category}-${item.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(index * 0.03, 0.4) }}
              >
                <Card
                  glass
                  hover
                  className={`h-full transition-all ${
                    worn ? 'ring-4 ring-primary-500 ring-offset-2 dark:ring-offset-gray-900' : ''
                  }`}
                >
                  <CardBody className="p-4 text-center flex flex-col h-full">
                    <div
                      className={`text-5xl sm:text-6xl mb-3 filter drop-shadow-lg ${
                        locked && !owned ? 'grayscale opacity-50' : ''
                      }`}
                    >
                      {item.icon}
                    </div>

                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                      {item.name}
                    </h3>

                    {!owned && (
                      <div className="flex items-center justify-center gap-1 text-sm font-bold text-primary-600 dark:text-primary-400 mb-3">
                        <Coins className="w-3.5 h-3.5" />
                        {item.cost}
                      </div>
                    )}

                    <div className="mt-auto pt-2">
                      {owned ? (
                        worn ? (
                          <div className="flex items-center justify-center gap-1 text-primary-600 dark:text-primary-400 text-xs font-semibold py-2">
                            <Check className="w-3.5 h-3.5" />
                            Equipped
                          </div>
                        ) : slot ? (
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => equip(slot, item.id)}
                          >
                            Equip
                          </Button>
                        ) : (
                          <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400 text-xs font-semibold py-2">
                            <Check className="w-3.5 h-3.5" />
                            Owned
                          </div>
                        )
                      ) : locked ? (
                        <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 text-xs font-medium py-2">
                          <Lock className="w-3.5 h-3.5" />
                          Level {item.levelRequired}
                        </div>
                      ) : (
                        <Button
                          variant={affordable ? 'primary' : 'outline'}
                          size="sm"
                          className="w-full text-xs"
                          disabled={!affordable}
                          onClick={() => handleBuy(item)}
                        >
                          {affordable ? 'Buy' : 'Not enough'}
                        </Button>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {items.length === 0 && (
          <Card glass>
            <CardBody className="text-center py-16">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Nothing in this category yet.
              </p>
            </CardBody>
          </Card>
        )}
      </div>

      {/* Purchase celebration */}
      <AnimatePresence>
        {justPurchased && (
          <Modal onClose={() => setJustPurchased(null)}>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-7xl mb-4"
            >
              {justPurchased.icon}
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {justPurchased.name} unlocked!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {CATEGORY_SLOT[justPurchased.category]
                ? "It's already equipped on your character."
                : 'Added to your collection.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" onClick={() => setJustPurchased(null)}>
                Keep shopping
              </Button>
              <Link to="/character-builder" className="sm:w-auto">
                <Button variant="outline" className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  View character
                </Button>
              </Link>
            </div>
          </Modal>
        )}

        {deniedItem && (
          <Modal onClose={() => setDeniedItem(null)}>
            <div className="text-6xl mb-4 grayscale">{deniedItem.item.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Not yet!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{deniedItem.reason}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/games" className="sm:w-auto">
                <Button variant="primary" className="w-full">
                  Earn points
                </Button>
              </Link>
              <Button variant="outline" onClick={() => setDeniedItem(null)}>
                Close
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Shared dialog shell for the purchase outcomes. */
function Modal({ children, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(event) => event.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
