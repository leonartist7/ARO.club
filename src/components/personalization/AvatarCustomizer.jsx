import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Palette, Lock, Star, Sparkles } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

/**
 * Avatar Customizer Component
 * Allows users to customize their avatar with unlockable items
 */
export default function AvatarCustomizer({ userLevel = 5, onSave }) {
  const [selectedSkin, setSelectedSkin] = useState('🙂');
  const [selectedBackground, setSelectedBackground] = useState('gradient-1');
  const [selectedBorder, setSelectedBorder] = useState('none');

  // Avatar skin tones and styles
  const skins = [
    { id: '🙂', emoji: '🙂', name: 'Happy', level: 1, unlocked: true },
    { id: '😊', emoji: '😊', name: 'Smiling', level: 1, unlocked: true },
    { id: '😎', emoji: '😎', name: 'Cool', level: 3, unlocked: true },
    { id: '🤓', emoji: '🤓', name: 'Nerd', level: 5, unlocked: true },
    { id: '🥳', emoji: '🥳', name: 'Party', level: 10, unlocked: false },
    { id: '🤩', emoji: '🤩', name: 'Star Struck', level: 15, unlocked: false },
    { id: '🧐', emoji: '🧐', name: 'Fancy', level: 20, unlocked: false },
    { id: '👑', emoji: '👑', name: 'Royal', level: 30, unlocked: false },
  ];

  // Background options
  const backgrounds = [
    { id: 'gradient-1', name: 'Sunshine', preview: 'bg-gradient-to-br from-primary-400 to-primary-600', level: 1, unlocked: true },
    { id: 'gradient-2', name: 'Ocean', preview: 'bg-gradient-to-br from-info-400 to-info-600', level: 1, unlocked: true },
    { id: 'gradient-3', name: 'Forest', preview: 'bg-gradient-to-br from-success-400 to-success-600', level: 5, unlocked: true },
    { id: 'gradient-4', name: 'Sunset', preview: 'bg-gradient-to-br from-coral-400 to-coral-600', level: 5, unlocked: true },
    { id: 'gradient-5', name: 'Galaxy', preview: 'bg-gradient-to-br from-accent-400 to-accent-600', level: 10, unlocked: false },
    { id: 'gradient-6', name: 'Rainbow', preview: 'bg-gradient-to-br from-primary-500 via-accent-500 to-info-500', level: 15, unlocked: false },
  ];

  // Border styles
  const borders = [
    { id: 'none', name: 'None', style: 'border-0', level: 1, unlocked: true },
    { id: 'basic', name: 'Basic', style: 'border-4 border-white', level: 1, unlocked: true },
    { id: 'gold', name: 'Gold', style: 'border-4 border-primary-400', level: 5, unlocked: true },
    { id: 'rainbow', name: 'Rainbow', style: 'border-4 border-gradient-rainbow', level: 10, unlocked: false },
    { id: 'premium', name: 'Premium', style: 'border-4 border-accent-400 shadow-accent', level: 20, unlocked: false },
  ];

  const isUnlocked = (level) => userLevel >= level;

  return (
    <div className="space-y-6">
      {/* Preview */}
      <Card className="bg-gradient-to-br from-gray-50 to-white">
        <CardBody>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary-500" />
            Preview
          </h3>
          <div className="flex justify-center items-center py-8">
            <motion.div
              key={`${selectedSkin}-${selectedBackground}-${selectedBorder}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="relative"
            >
              <div
                className={`w-32 h-32 rounded-full ${backgrounds.find((b) => b.id === selectedBackground)?.preview}
                ${borders.find((b) => b.id === selectedBorder)?.style}
                flex items-center justify-center text-6xl shadow-2xl`}
              >
                {selectedSkin}
              </div>
              {userLevel >= 10 && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-2 -right-2 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center shadow-premium"
                >
                  <Star className="w-5 h-5 text-white fill-white" />
                </motion.div>
              )}
            </motion.div>
          </div>
        </CardBody>
      </Card>

      {/* Skin Selection */}
      <Card>
        <CardBody>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary-500" />
            Avatar Style
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {skins.map((skin) => {
              const unlocked = isUnlocked(skin.level);

              return (
                <motion.button
                  key={skin.id}
                  whileHover={unlocked ? { scale: 1.05 } : {}}
                  whileTap={unlocked ? { scale: 0.95 } : {}}
                  onClick={() => unlocked && setSelectedSkin(skin.id)}
                  className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center text-4xl
                    transition-all ${
                      selectedSkin === skin.id
                        ? 'bg-primary-100 ring-4 ring-primary-500 shadow-premium'
                        : unlocked
                        ? 'bg-gray-100 hover:bg-gray-200'
                        : 'bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                  disabled={!unlocked}
                >
                  {!unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/30 rounded-2xl">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                  )}
                  {skin.emoji}
                  <span className="text-xs mt-1 text-gray-600 font-medium">
                    {unlocked ? skin.name : `Lvl ${skin.level}`}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Background Selection */}
      <Card>
        <CardBody>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-500" />
            Background
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {backgrounds.map((bg) => {
              const unlocked = isUnlocked(bg.level);

              return (
                <motion.button
                  key={bg.id}
                  whileHover={unlocked ? { scale: 1.05 } : {}}
                  whileTap={unlocked ? { scale: 0.95 } : {}}
                  onClick={() => unlocked && setSelectedBackground(bg.id)}
                  className={`relative aspect-video rounded-2xl overflow-hidden transition-all ${
                    selectedBackground === bg.id
                      ? 'ring-4 ring-primary-500 shadow-premium'
                      : ''
                  }`}
                  disabled={!unlocked}
                >
                  <div className={`w-full h-full ${bg.preview}`} />
                  {!unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/70 to-transparent p-2">
                    <p className="text-xs font-medium text-white text-center">
                      {unlocked ? bg.name : `Lvl ${bg.level}`}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Level Progress */}
      <Card className="bg-gradient-to-r from-primary-50 to-success-50 border-2 border-primary-200">
        <CardBody>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Unlock More Items!</h4>
              <p className="text-sm text-gray-600">
                Level up to unlock exclusive avatar customizations
              </p>
            </div>
            <Badge variant="primary" className="text-lg">
              Level {userLevel}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Next unlock at Level 10</span>
              <span className="font-medium text-primary-600">
                {userLevel >= 10 ? '✓ Unlocked' : `${10 - userLevel} levels to go`}
              </span>
            </div>
            {userLevel < 10 && (
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(userLevel / 10) * 100}%` }}
                  className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
                />
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Save Button */}
      <div className="flex gap-3">
        <Button variant="primary" size="lg" fullWidth onClick={() => onSave?.({ selectedSkin, selectedBackground, selectedBorder })}>
          Save Avatar
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            setSelectedSkin('🙂');
            setSelectedBackground('gradient-1');
            setSelectedBorder('none');
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
