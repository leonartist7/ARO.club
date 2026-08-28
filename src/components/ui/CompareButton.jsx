import { Plus, Check } from 'lucide-react';
import clsx from 'clsx';
import { useCompare } from '../../hooks/useCompare';
import Button from './Button';

/**
 * Compare Button Component
 * Allows adding/removing experiences from comparison list
 */
export default function CompareButton({ experienceId, className, size = 'md' }) {
  const { isInCompare, addToCompare, removeFromCompare, canAddMore } = useCompare();

  const inCompare = isInCompare(experienceId);
  const disabled = !inCompare && !canAddMore();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (inCompare) {
      removeFromCompare(experienceId);
    } else {
      addToCompare(experienceId);
    }
  };

  return (
    <Button
      variant={inCompare ? 'primary' : 'outline'}
      size={size}
      onClick={handleClick}
      disabled={disabled}
      icon={inCompare ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      className={clsx(className)}
      title={
        disabled
          ? 'Maximum 3 experiences can be compared'
          : inCompare
          ? 'Remove from compare'
          : 'Add to compare'
      }
    >
      {inCompare ? 'In Compare' : 'Compare'}
    </Button>
  );
}
