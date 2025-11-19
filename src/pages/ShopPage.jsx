import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Star, ShoppingBag, Check, Lock, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';

const CATEGORIES = [
  { id: 'all', name: 'All Items', emoji: '🛍️' },
  { id: 'accessory', name: 'Accessories', emoji: '🕶️' },
  { id: 'outfit', name: 'Outfits', emoji: '👔' },
  { id: 'hairstyle', name: 'Hairstyles', emoji: '💇' },
  { id: 'furniture', name: 'Furniture', emoji: '🛋️' },
  { id: 'decoration', name: 'Decorations', emoji: '🖼️' },
];

export default function ShopPage() {
  const [shopItems, setShopItems] = useState([]);
  const [userInventory, setUserInventory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [purchasingItem, setPurchasingItem] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { user, profile } = useAuth();

  useEffect(() => {
    loadShopItems();
    loadUserInventory();
  }, []);

  const loadShopItems = async () => {
    try {
      const { data, error } = await supabase
        .from('shop_items')
        .select('*')
        .eq('available', true)
        .order('price_points', { ascending: true });

      if (error) throw error;
      setShopItems(data || []);
    } catch (error) {
      console.error('Error loading shop items:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserInventory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_inventory')
        .select('item_id, purchased_at, equipped')
        .eq('user_id', user.id);

      if (error) throw error;
      setUserInventory(data || []);
    } catch (error) {
      console.error('Error loading inventory:', error);
    }
  };

  const isOwned = (itemId) => {
    return userInventory.some(inv => inv.item_id === itemId);
  };

  const isEquipped = (itemId) => {
    return userInventory.some(inv => inv.item_id === itemId && inv.equipped);
  };

  const canAfford = (price) => {
    return (profile?.points || 0) >= price;
  };

  const meetsLevelRequirement = (requiredLevel) => {
    return (profile?.level || 1) >= requiredLevel;
  };

  const handlePurchase = async (item) => {
    if (!canAfford(item.price_points)) {
      alert('Not enough points!');
      return;
    }

    if (!meetsLevelRequirement(item.level_required)) {
      alert(`You need to be level ${item.level_required} to purchase this item.`);
      return;
    }

    if (isOwned(item.id)) {
      alert('You already own this item!');
      return;
    }

    setPurchasingItem(item.id);

    try {
      // Add to user inventory
      const { error: invError } = await supabase
        .from('user_inventory')
        .insert({
          user_id: user.id,
          item_id: item.id,
          equipped: false,
        });

      if (invError) throw invError;

      // Deduct points
      const newPoints = (profile?.points || 0) - item.price_points;
      const { error: pointsError } = await supabase
        .from('profiles')
        .update({ points: newPoints })
        .eq('id', user.id);

      if (pointsError) throw pointsError;

      // Check for shopping achievements
      const totalSpent = shopItems
        .filter(i => isOwned(i.id))
        .reduce((sum, i) => sum + i.price_points, 0) + item.price_points;

      if (totalSpent >= 500) {
        await supabase.from('user_achievements').insert({
          user_id: user.id,
          achievement_id: 'big_spender',
        }).catch(() => {}); // Ignore if already has achievement
      }

      // Check category-specific achievements
      const ownedAccessories = shopItems.filter(i =>
        i.category === 'accessory' && (isOwned(i.id) || i.id === item.id)
      ).length;
      if (ownedAccessories >= 5) {
        await supabase.from('user_achievements').insert({
          user_id: user.id,
          achievement_id: 'fashionista',
        }).catch(() => {});
      }

      const ownedDecor = shopItems.filter(i =>
        (i.category === 'furniture' || i.category === 'decoration') &&
        (isOwned(i.id) || i.id === item.id)
      ).length;
      if (ownedDecor >= 5) {
        await supabase.from('user_achievements').insert({
          user_id: user.id,
          achievement_id: 'decorator',
        }).catch(() => {});
      }

      // Reload data
      await loadUserInventory();
      setSelectedItem(item);
      setShowPurchaseModal(true);
    } catch (error) {
      console.error('Error purchasing item:', error);
      alert('Failed to purchase item. Please try again.');
    } finally {
      setPurchasingItem(null);
    }
  };

  const handleEquip = async (item) => {
    try {
      // Unequip all items in same category
      await supabase
        .from('user_inventory')
        .update({ equipped: false })
        .eq('user_id', user.id)
        .in('item_id', shopItems.filter(i => i.category === item.category).map(i => i.id));

      // Equip selected item
      await supabase
        .from('user_inventory')
        .update({ equipped: true })
        .eq('user_id', user.id)
        .eq('item_id', item.id);

      await loadUserInventory();
    } catch (error) {
      console.error('Error equipping item:', error);
    }
  };

  const filteredItems = selectedCategory === 'all'
    ? shopItems
    : shopItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading shop...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">🛍️ Shop</h1>
          <p className="text-xl text-gray-600 mb-6">
            Customize your avatar and virtual home!
          </p>

          {/* User Points */}
          {profile && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full shadow-lg"
            >
              <Star className="w-6 h-6 fill-current" />
              <span className="text-3xl font-bold">{profile.points}</span>
              <span className="text-lg">points</span>
            </motion.div>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-yellow-400 text-gray-800 shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map((item, index) => {
            const owned = isOwned(item.id);
            const equipped = isEquipped(item.id);
            const affordable = canAfford(item.price_points);
            const levelOk = meetsLevelRequirement(item.level_required);
            const purchasing = purchasingItem === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full">
                  <CardBody className="p-4 flex flex-col h-full">
                    {/* Item Preview */}
                    <div className={`relative mb-4 aspect-square rounded-xl flex items-center justify-center text-6xl ${
                      owned ? 'bg-gradient-to-br from-green-50 to-teal-50' :
                      affordable && levelOk ? 'bg-gradient-to-br from-yellow-50 to-orange-50' :
                      'bg-gray-100'
                    }`}>
                      {item.emoji}
                      {equipped && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      {!levelOk && !owned && (
                        <div className="absolute inset-0 bg-gray-900/50 rounded-xl flex items-center justify-center">
                          <Lock className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Item Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Level Requirement */}
                    {item.level_required > 1 && (
                      <div className={`text-xs mb-2 ${
                        levelOk ? 'text-gray-500' : 'text-red-600 font-semibold'
                      }`}>
                        Level {item.level_required}+
                      </div>
                    )}

                    {/* Price / Actions */}
                    {owned ? (
                      equipped ? (
                        <div className="bg-green-100 text-green-700 text-sm font-semibold py-2 px-3 rounded-xl text-center">
                          Equipped
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleEquip(item)}
                          variant="secondary"
                          size="sm"
                          className="w-full"
                        >
                          Equip
                        </Button>
                      )
                    ) : (
                      <Button
                        onClick={() => handlePurchase(item)}
                        disabled={purchasing || !affordable || !levelOk}
                        size="sm"
                        className={`w-full ${
                          !affordable || !levelOk
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        {purchasing ? (
                          'Purchasing...'
                        ) : !levelOk ? (
                          <span className="flex items-center justify-center gap-1">
                            <Lock className="w-3 h-3" />
                            Locked
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 fill-current" />
                            {item.price_points}
                          </span>
                        )}
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No items in this category yet.</p>
          </div>
        )}
      </div>

      {/* Purchase Success Modal */}
      <AnimatePresence>
        {showPurchaseModal && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowPurchaseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-8xl mb-4"
              >
                {selectedItem.emoji}
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Purchase Successful!
              </h3>
              <p className="text-gray-600 mb-6">
                You got <strong>{selectedItem.name}</strong>!
              </p>

              <Button
                onClick={() => setShowPurchaseModal(false)}
                className="w-full"
              >
                Awesome!
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
