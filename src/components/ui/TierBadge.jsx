import { ShieldCheck, BadgeCheck, Crown } from 'lucide-react';
import Badge from './Badge';
import { cn } from '../../utils/cn';

const TIER_CONFIG = {
  verified: {
    label: 'Verified',
    icon: ShieldCheck,
    className:
      'bg-success-50 text-success-700 border-success-500/30 dark:bg-success-500/10 dark:text-success-500 dark:border-success-500/30',
  },
  pro: {
    label: 'Pro',
    icon: BadgeCheck,
    className:
      'bg-info-50 text-info-700 border-info-500/30 dark:bg-info-500/10 dark:text-info-500 dark:border-info-500/30',
  },
  elite: {
    label: 'Top Tongue',
    icon: Crown,
    className:
      'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700',
  },
};

/**
 * Teacher verification-tier badge (Trust Engine tiers).
 * Always includes icon + text label — never color-only.
 */
export default function TierBadge({ tier, size = 'sm', className }) {
  const config = TIER_CONFIG[tier];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <Badge
      size={size}
      className={cn(config.className, className)}
      icon={<Icon className="w-3.5 h-3.5" aria-hidden="true" />}
      title="Hand-verified by the Tonguee team."
    >
      {config.label}
    </Badge>
  );
}
