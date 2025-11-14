import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
  Home,
  ShoppingBag,
  Package,
  Settings,
  Plus,
  X,
  Star,
  Info
} from 'lucide-react';
import homeObjectsData from '../data/homeObjects.json';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// 3D Object Component
function Object3D({ object, position, onClick, isSelected }) {
  const config = object.model_config;

  const renderShape = () => {
    switch (object.model_type) {
      case 'box':
        return (
          <mesh position={position} onClick={onClick}>
            <boxGeometry args={[config.width || 1, config.height || 1, config.depth || 1]} />
            <meshStandardMaterial
              color={config.color || '#888888'}
              emissive={isSelected ? '#ffffff' : '#000000'}
              emissiveIntensity={isSelected ? 0.3 : 0}
            />
          </mesh>
        );
      case 'sphere':
        return (
          <mesh position={position} onClick={onClick}>
            <sphereGeometry args={[config.radius || 0.5, 32, 32]} />
            <meshStandardMaterial
              color={config.color || '#888888'}
              emissive={isSelected ? '#ffffff' : '#000000'}
              emissiveIntensity={isSelected ? 0.3 : 0}
            />
          </mesh>
        );
      case 'cylinder':
        return (
          <mesh position={position} onClick={onClick}>
            <cylinderGeometry args={[config.radius || 0.5, config.radius || 0.5, config.height || 1, 32]} />
            <meshStandardMaterial
              color={config.color || '#888888'}
              emissive={isSelected ? '#ffffff' : '#000000'}
              emissiveIntensity={isSelected ? 0.3 : 0}
            />
          </mesh>
        );
      default:
        return (
          <mesh position={position} onClick={onClick}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#888888" />
          </mesh>
        );
    }
  };

  return (
    <group>
      {renderShape()}
      {isSelected && (
        <Text
          position={[position[0], position[1] + 1, position[2]]}
          fontSize={0.3}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {object.name}
        </Text>
      )}
    </group>
  );
}

// Scene Component
function HomeScene({ placedObjects, onObjectClick, selectedObjectId }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>

      {/* Grid helper */}
      <gridHelper args={[20, 20, '#cccccc', '#eeeeee']} position={[0, -1.99, 0]} />

      {/* Placed Objects */}
      {placedObjects.map((placed) => (
        <Object3D
          key={placed.id}
          object={placed.object}
          position={[placed.position_x, placed.position_y, placed.position_z]}
          onClick={() => onObjectClick(placed)}
          isSelected={placed.id === selectedObjectId}
        />
      ))}

      {/* Camera and Controls */}
      <PerspectiveCamera makeDefault position={[5, 5, 5]} />
      <OrbitControls enablePan enableZoom enableRotate />
    </>
  );
}

export default function MyHomePage() {
  const { user, profile, updateProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState([]);
  const [placedObjects, setPlacedObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [showShop, setShowShop] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showObjectInfo, setShowObjectInfo] = useState(null);

  useEffect(() => {
    if (user) {
      loadUserHome();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadUserHome = async () => {
    try {
      setLoading(true);

      // Load user inventory
      const { data: inventoryData, error: invError } = await supabase
        .from('user_inventory')
        .select('*, home_objects(*)')
        .eq('user_id', user.id);

      if (invError) throw invError;

      setInventory(inventoryData || []);

      // Load placed objects
      const { data: placedData, error: placedError } = await supabase
        .from('user_home_customization')
        .select('*, home_objects(*)')
        .eq('user_id', user.id)
        .eq('is_visible', true);

      if (placedError) throw placedError;

      const formattedPlaced = placedData?.map(p => ({
        id: p.id,
        object_id: p.object_id,
        object: p.home_objects,
        position_x: parseFloat(p.position_x),
        position_y: parseFloat(p.position_y),
        position_z: parseFloat(p.position_z),
        rotation_x: parseFloat(p.rotation_x),
        rotation_y: parseFloat(p.rotation_y),
        rotation_z: parseFloat(p.rotation_z),
        scale: parseFloat(p.scale),
        custom_name: p.custom_name
      })) || [];

      setPlacedObjects(formattedPlaced);
    } catch (error) {
      console.error('Error loading home:', error);
    } finally {
      setLoading(false);
    }
  };

  const purchaseObject = async (object) => {
    if (!user) {
      alert('Please log in to purchase items');
      return;
    }

    if (profile.points < object.price_points) {
      alert('Not enough points!');
      return;
    }

    try {
      // Add to inventory
      const { error: invError } = await supabase
        .from('user_inventory')
        .insert({
          user_id: user.id,
          object_id: object.id,
          acquisition_method: 'purchase'
        });

      if (invError) throw invError;

      // Deduct points
      const newPoints = profile.points - object.price_points;
      await updateProfile({ points: newPoints });

      // Reload
      await loadUserHome();
      alert(`Purchased ${object.name}!`);
    } catch (error) {
      console.error('Error purchasing:', error);
      alert('Failed to purchase item');
    }
  };

  const placeObject = async (inventoryItem) => {
    if (!user) return;

    try {
      // Place at a random position
      const randomX = (Math.random() - 0.5) * 6;
      const randomZ = (Math.random() - 0.5) * 6;

      const { error } = await supabase
        .from('user_home_customization')
        .insert({
          user_id: user.id,
          object_id: inventoryItem.object_id,
          position_x: randomX,
          position_y: 0,
          position_z: randomZ,
          rotation_x: 0,
          rotation_y: 0,
          rotation_z: 0,
          scale: 1.0,
          is_visible: true
        });

      if (error) throw error;

      await loadUserHome();
      setShowInventory(false);
    } catch (error) {
      console.error('Error placing object:', error);
      alert('Failed to place object');
    }
  };

  const removeObject = async (placedId) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_home_customization')
        .delete()
        .eq('id', placedId);

      if (error) throw error;

      await loadUserHome();
      setSelectedObject(null);
    } catch (error) {
      console.error('Error removing object:', error);
    }
  };

  const handleObjectClick = (placed) => {
    setSelectedObject(placed);
    setShowObjectInfo(placed.object);
  };

  const getAvailableObjects = () => {
    const inventoryIds = inventory.map(i => i.object_id);
    return homeObjectsData.filter(obj => !inventoryIds.includes(obj.id));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Log In</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to customize your home</p>
          <Button onClick={() => window.location.href = '/login'}>
            Log In
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b-2 border-purple-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Home className="w-8 h-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My 3D Home</h1>
                <p className="text-sm text-gray-600">Customize your learning space</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="font-bold text-gray-900">{profile?.points || 0} points</span>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowInventory(!showInventory)}
                className="flex items-center gap-2"
              >
                <Package className="w-5 h-5" />
                Inventory ({inventory.length})
              </Button>
              <Button
                onClick={() => setShowShop(!showShop)}
                className="flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="relative" style={{ height: 'calc(100vh - 100px)' }}>
        <Canvas shadows>
          <Suspense fallback={null}>
            <HomeScene
              placedObjects={placedObjects}
              onObjectClick={handleObjectClick}
              selectedObjectId={selectedObject?.id}
            />
          </Suspense>
        </Canvas>

        {/* Controls Overlay */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            Controls
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>🖱️ Click & Drag: Rotate view</li>
            <li>🔍 Scroll: Zoom in/out</li>
            <li>👆 Click objects: Select & view info</li>
          </ul>
        </div>

        {/* Selected Object Info */}
        {showObjectInfo && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-6 max-w-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{showObjectInfo.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900">{showObjectInfo.name}</h3>
                  <p className="text-sm text-gray-600">{showObjectInfo.category}</p>
                </div>
              </div>
              <button
                onClick={() => setShowObjectInfo(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-700 mb-3">
              {showObjectInfo.interactive_message}
            </p>

            {showObjectInfo.fun_fact && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                <p className="text-sm text-blue-900">
                  💡 {showObjectInfo.fun_fact}
                </p>
              </div>
            )}

            {selectedObject && (
              <Button
                variant="danger"
                onClick={() => removeObject(selectedObject.id)}
                className="w-full"
              >
                Remove from Home
              </Button>
            )}
          </motion.div>
        )}
      </div>

      {/* Shop Modal */}
      {showShop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6" />
                  Item Shop
                </h2>
                <button onClick={() => setShowShop(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getAvailableObjects().map(obj => (
                  <div key={obj.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-400 transition">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-4xl">{obj.icon}</span>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        obj.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                        obj.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                        obj.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {obj.rarity}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{obj.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{obj.description}</p>

                    {obj.price_points > 0 ? (
                      <Button
                        onClick={() => purchaseObject(obj)}
                        disabled={profile.points < obj.price_points}
                        className="w-full text-sm"
                      >
                        <Star className="w-4 h-4 inline mr-1" />
                        {obj.price_points} pts
                      </Button>
                    ) : (
                      <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded text-center">
                        Unlock by completing lessons
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Inventory Modal */}
      {showInventory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b bg-gradient-to-r from-green-500 to-teal-500 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Package className="w-6 h-6" />
                  My Inventory
                </h2>
                <button onClick={() => setShowInventory(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              {inventory.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Your inventory is empty. Visit the shop to buy items!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {inventory.map(item => {
                    const obj = item.home_objects;
                    return (
                      <div key={item.object_id} className="border-2 border-gray-200 rounded-lg p-4">
                        <span className="text-4xl block mb-2">{obj.icon}</span>
                        <h3 className="font-bold text-gray-900 mb-2">{obj.name}</h3>
                        <Button
                          onClick={() => placeObject(item)}
                          className="w-full text-sm"
                        >
                          <Plus className="w-4 h-4 inline mr-1" />
                          Place in Home
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
