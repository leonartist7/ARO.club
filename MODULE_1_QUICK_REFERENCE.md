# Module 1: Quick Reference Card

## Import Statements

```jsx
// Theme
import { useTheme } from './contexts/ThemeContext';
import ThemeToggle from './components/ui/ThemeToggle';

// Toasts
import { useToast } from './hooks/useToast';

// Skeletons
import Skeleton, {
  SkeletonText,
  SkeletonTitle,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonImage
} from './components/ui/Skeleton';
import ExperienceCardSkeleton from './components/ui/ExperienceCardSkeleton';
import TeacherCardSkeleton from './components/ui/TeacherCardSkeleton';
import ProfileSkeleton from './components/ui/ProfileSkeleton';

// States
import EmptyState from './components/ui/EmptyState';
import ErrorState from './components/ui/ErrorState';
import ErrorBoundary from './components/ErrorBoundary';

// Accessibility
import SkipToContent from './components/ui/SkipToContent';

// Demo
import ToastDemo from './components/demo/ToastDemo';
import ComponentShowcase from './components/demo/ComponentShowcase';
```

## Usage Snippets

### Dark Mode
```jsx
const { theme, toggleTheme, isDark } = useTheme();
```

### Toasts
```jsx
const toast = useToast();
toast.success('Success!');
toast.error('Error!');
toast.warning('Warning!');
toast.info('Info!');
```

### Loading State
```jsx
{loading ? <ExperienceCardSkeleton /> : <ExperienceCard {...data} />}
```

### Empty State
```jsx
<EmptyState
  icon={<Package className="w-12 h-12" />}
  title="No items"
  description="Description here"
  action={{ label: "Action", onClick: handler }}
/>
```

### Error State
```jsx
<ErrorState type="network" onRetry={handleRetry} />
<ErrorState type="notFound" />
<ErrorState type="server" onRetry={handleRetry} />
```

## File Locations

| Component | Path |
|-----------|------|
| ThemeContext | `/src/contexts/ThemeContext.jsx` |
| ThemeToggle | `/src/components/ui/ThemeToggle.jsx` |
| ToastContext | `/src/contexts/ToastContext.jsx` |
| Toast | `/src/components/ui/Toast.jsx` |
| useToast hook | `/src/hooks/useToast.js` |
| Skeleton | `/src/components/ui/Skeleton.jsx` |
| ExperienceCardSkeleton | `/src/components/ui/ExperienceCardSkeleton.jsx` |
| TeacherCardSkeleton | `/src/components/ui/TeacherCardSkeleton.jsx` |
| ProfileSkeleton | `/src/components/ui/ProfileSkeleton.jsx` |
| EmptyState | `/src/components/ui/EmptyState.jsx` |
| ErrorState | `/src/components/ui/ErrorState.jsx` |
| ErrorBoundary | `/src/components/ErrorBoundary.jsx` |
| SkipToContent | `/src/components/ui/SkipToContent.jsx` |
| ToastDemo | `/src/components/demo/ToastDemo.jsx` |
| ComponentShowcase | `/src/components/demo/ComponentShowcase.jsx` |

## Integration Points

- **Layout.jsx**: ThemeProvider, ToastProvider, ErrorBoundary, SkipToContent
- **Header.jsx**: ThemeToggle (desktop + mobile)
- **tailwind.config.js**: Dark mode enabled, shimmer animation added
- **Button.jsx**: Dark mode variants added
- **Card.jsx**: Dark mode variants added

## Testing

1. **Quick test:** `npm run dev`
2. **Add demo to any page:** Import `ToastDemo` or `ComponentShowcase`
3. **Or add route:**
   ```jsx
   // In routes.jsx
   const ComponentShowcase = lazy(() => import('../components/demo/ComponentShowcase'));

   { path: 'demo', element: <ComponentShowcase /> }
   ```
   Then visit `/demo`

## Dark Mode Classes

All components support these Tailwind dark mode classes:
- `dark:bg-gray-800` - Dark backgrounds
- `dark:text-gray-100` - Dark text
- `dark:border-gray-700` - Dark borders
- `dark:hover:bg-gray-700` - Dark hover states

## Accessibility Features

- ✅ Skip to content link (Tab to reveal)
- ✅ ARIA labels on all interactive elements
- ✅ Focus-visible styles
- ✅ Screen reader support
- ✅ Keyboard navigation

## Component Props

### ThemeToggle
```jsx
<ThemeToggle className="..." />
```

### Toast (via useToast)
```jsx
toast.success(message, duration?)
toast.error(message, duration?)
toast.warning(message, duration?)
toast.info(message, duration?)
```

### EmptyState
```jsx
<EmptyState
  icon={ReactNode}           // Lucide icon
  title={string}             // Main heading
  description={string}       // Description
  action={{                  // Optional
    label: string,
    onClick: function,
    href: string            // OR href instead of onClick
  }}
  className={string}        // Optional
/>
```

### ErrorState
```jsx
<ErrorState
  type="network|notFound|server|generic"  // Error type
  title={string}                          // Optional override
  description={string}                    // Optional override
  onRetry={function}                      // Optional retry handler
  retryLabel={string}                     // Default: "Try Again"
  action={ReactNode}                      // Optional custom action
  className={string}                      // Optional
/>
```

### Skeleton
```jsx
<Skeleton className="w-full h-4" />
<SkeletonText width="w-3/4" />
<SkeletonTitle width="w-1/2" />
<SkeletonAvatar size="sm|md|lg|xl" />
<SkeletonButton width="w-24" />
<SkeletonImage aspectRatio="aspect-video" />
```
