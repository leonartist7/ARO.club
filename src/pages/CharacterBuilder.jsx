import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Sparkles, Crown, Star, Check, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { characters, accessories } from '../data/characters';
import { usePlayerStore } from '../store/usePlayerStore';
import { CATEGORY_SLOT, inventoryKey } from '../data/shop';

export default function CharacterBuilder() {
  const [selectedCategory, setSelectedCategory] = useState('characters');

  // Points, inventory and loadout all live in the player store, so buying a
  // hat here shows up instantly in the header and on the dashboard.
  const userPoints = usePlayerStore((state) => state.points);
  const inventory = usePlayerStore((state) => state.inventory);
  const equipped = usePlayerStore((state) => state.equipped);
  const buyItem = usePlayerStore((state) => state.buyItem);
  const equip = usePlayerStore((state) => state.equipItem);

  const categories = [
    { id: 'characters', name: 'Characters', emoji: '🦉' },
    { id: 'hats', name: 'Hats', emoji: '🎩' },
    { id: 'glasses', name: 'Glasses', emoji: '😎' },
    { id: 'accessories', name: 'Accessories', emoji: '⭐' },
    { id: 'backgrounds', name: 'Backgrounds', emoji: '🌅' },
  ];

  /** Free starter items count as owned without appearing in the inventory. */
  const isOwned = (item, category) =>
    item.cost === 0 ||
    item.unlocked === true ||
    inventory.includes(inventoryKey(category, item.id));

  const purchaseItem = (item, category) => {
    if (isOwned(item, category)) return;

    const bought = buyItem({ id: inventoryKey(category, item.id), cost: item.cost });
    if (bought) {
      equip(CATEGORY_SLOT[category], item.id); // auto-equip what you just bought
    }
  };

  const equipItem = (itemId, category) => {
    const item = (category === 'characters' ? characters : accessories[category])?.find(
      (i) => i.id === itemId
    );
    if (item && isOwned(item, category)) {
      equip(CATEGORY_SLOT[category], itemId);
    }
  };

  const unequipItem = (slot) => equip(slot, null);

  // Get current character emoji
  const getCurrentCharacter = () => {
    const char = characters.find(c => c.id === equipped.character);
    return char?.emoji || '🦉';
  };

  // Get equipped accessory emojis
  const getEquippedEmoji = (category, items) => {
    const equippedId = equipped[category];
    if (!equippedId) return null;

    const item = items?.find(i => i.id === equippedId);
    return item?.emoji;
  };

  // Character Preview Component
  const CharacterPreview = () => (
    <div className="relative flex items-center justify-center h-64">
      {/* Background */}
      {equipped.background && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl overflow-hidden"
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-200 via-pink-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 opacity-30"></div>
        </motion.div>
      )}

      {/* Character */}
      <div className="relative z-10">
        <motion.div
          key={equipped.character}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-9xl filter drop-shadow-2xl"
        >
          {getCurrentCharacter()}
        </motion.div>

        {/* Hat */}
        <AnimatePresence>
          {equipped.hat && (
            <motion.div
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: -20 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 text-5xl"
            >
              {getEquippedEmoji('hat', accessories.hats)}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glasses */}
        <AnimatePresence>
          {equipped.glasses && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl"
            >
              {getEquippedEmoji('glasses', accessories.glasses)}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Accessory */}
        <AnimatePresence>
          {equipped.accessory && (
            <motion.div
              initial={{ scale: 0, x: 20 }}
              animate={{
                scale: 1,
                x: 0,
                rotate: [0, 10, -10, 0],
              }}
              exit={{ scale: 0, x: 20 }}
              transition={{
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                },
              }}
              className="absolute -right-8 top-1/2 -translate-y-1/2 text-4xl"
            >
              {getEquippedEmoji('accessory', accessories.accessories)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  // Render items based on category
  const renderItems = () => {
    let items = [];

    if (selectedCategory === 'characters') {
      items = characters;
    } else {
      items = accessories[selectedCategory] || [];
    }

    return items.map((item, index) => {
      const owned = isOwned(item, selectedCategory);
      const isEquipped = equipped[CATEGORY_SLOT[selectedCategory]] === item.id;

      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className="relative"
        >
          <Card
            glass
            hover
            className={`cursor-pointer transition-all ${
              isEquipped
                ? 'ring-4 ring-primary-500 ring-offset-2 dark:ring-offset-gray-900'
                : ''
            }`}
          >
            <CardBody className="p-4 text-center">
              <div className="text-6xl mb-3 filter drop-shadow-lg">
                {item.emoji}
              </div>

              <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                {item.name}
              </h4>

              {owned ? (
                <div className="space-y-2">
                  {isEquipped ? (
                    <div className="flex items-center justify-center gap-1 text-primary-600 dark:text-primary-400 text-xs font-medium">
                      <Check className="w-3 h-3" />
                      Equipped
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => equipItem(item.id, selectedCategory)}
                      className="w-full text-xs"
                    >
                      Equip
                    </Button>
                  )}
                  {isEquipped && selectedCategory !== 'characters' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => unequipItem(CATEGORY_SLOT[selectedCategory])}
                      className="w-full text-xs"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => purchaseItem(item, selectedCategory)}
                  disabled={userPoints < item.cost}
                  className="w-full text-xs"
                >
                  <ShoppingBag className="w-3 h-3 mr-1" />
                  {item.cost}
                </Button>
              )}

              {!owned && userPoints < item.cost && (
                <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              )}
            </CardBody>
          </Card>
        </motion.div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/student-dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Character Builder
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Customize your learning companion
              </p>
            </div>
          </div>

          {/* Points Display */}
          <motion.div
            className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg px-6 py-3 rounded-2xl border-2 border-primary-300 dark:border-primary-700 shadow-lg"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Star className="w-6 h-6 text-primary-500 fill-primary-500" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {userPoints}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              points
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Character Preview */}
          <div className="lg:col-span-1">
            <Card glass className="sticky top-8">
              <CardBody>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary-500" />
                  Your Character
                </h2>

                <CharacterPreview />

                <div className="mt-6 space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">Character:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {characters.find(c => c.id === equipped.character)?.name}
                    </span>
                  </div>
                  {equipped.hat && (
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Hat:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {accessories.hats.find(h => h.id === equipped.hat)?.name}
                      </span>
                    </div>
                  )}
                  {equipped.glasses && (
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Glasses:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {accessories.glasses.find(g => g.id === equipped.glasses)?.name}
                      </span>
                    </div>
                  )}
                  {equipped.accessory && (
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Accessory:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {accessories.accessories.find(a => a.id === equipped.accessory)?.name}
                      </span>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <Card glass>
              <CardBody>
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 p-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary-500 text-white shadow-lg scale-105'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span>{category.emoji}</span>
                      <span className="text-sm">{category.name}</span>
                    </button>
                  ))}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {renderItems()}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Card glass>
            <CardBody className="text-center py-6">
              <Crown className="w-8 h-8 text-primary-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Earn More Points!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Complete daily quests, maintain your streak, and finish lessons to earn points for new items!
              </p>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
