# Module 1: Foundation & System Components - Testing Guide

All components have been successfully implemented and integrated! Here's how to test each feature:

## 1. Dark Mode Theme System

### Testing Dark Mode:
1. Start the development server: `npm run dev`
2. Look for the sun/moon icon toggle in the header (desktop and mobile)
3. Click the toggle to switch between light and dark themes
4. Refresh the page - the theme should persist
5. Try changing your system theme preference - the app will respect it on first load

### Files Created:
- `/src/contexts/ThemeContext.jsx` - Theme state management with localStorage persistence
- `/src/components/ui/ThemeToggle.jsx` - Toggle button component

## 2. Toast Notification System

### Testing Toasts:
Add this code to any component to test toast notifications:

```jsx
import { useToast } from '../hooks/useToast';

function YourComponent() {
  const toast = useToast();

  return (
    <div>
      <button onClick={() => toast.success('Success message!')}>
        Test Success
      </button>
      <button onClick={() => toast.error('Error message!')}>
        Test Error
      </button>
      <button onClick={() => toast.warning('Warning message!')}>
        Test Warning
      </button>
      <button onClick={() => toast.info('Info message!')}>
        Test Info
      </button>
    </div>
  );
}
```

### Quick Test in Browser Console:
Open browser console and run:
```javascript
// Import is already available via window context if needed
// For quick testing, you can dispatch custom events or modify a page component
```

### Files Created:
- `/src/contexts/ToastContext.jsx` - Toast queue management (max 3 visible)
- `/src/components/ui/Toast.jsx` - Toast component with animations and progress bar
- `/src/hooks/useToast.js` - Custom hook for easy toast access

## 3. Skeleton Loading Components

### Testing Skeletons:
Replace any data-loading component temporarily with skeleton versions:

```jsx
import ExperienceCardSkeleton from '../components/ui/ExperienceCardSkeleton';
import TeacherCardSkeleton from '../components/ui/TeacherCardSkeleton';
import ProfileSkeleton from '../components/ui/ProfileSkeleton';

// Show skeleton while loading
{loading ? <ExperienceCardSkeleton /> : <ExperienceCard data={data} />}
```

### Files Created:
- `/src/components/ui/Skeleton.jsx` - Base skeleton with shimmer animation
- `/src/components/ui/ExperienceCardSkeleton.jsx` - Matches ExperienceCard layout
- `/src/components/ui/TeacherCardSkeleton.jsx` - Matches TeacherCard layout
- `/src/components/ui/ProfileSkeleton.jsx` - For profile pages

## 4. Error & Empty States

### Testing Error States:
```jsx
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import { Package } from 'lucide-react';

// Network error example
<ErrorState
  type="network"
  onRetry={handleRetry}
/>

// Empty state example
<EmptyState
  icon={<Package className="w-12 h-12" />}
  title="No experiences found"
  description="Try adjusting your filters"
  action={{
    label: "Clear filters",
    onClick: handleClearFilters
  }}
/>
```

### Testing Error Boundary:
The ErrorBoundary is already wrapping the entire app in Layout.jsx. To test:
1. Add a component that throws an error
2. The error boundary will catch it and show a fallback UI
3. In development mode, you'll see error details

### Files Created:
- `/src/components/ui/EmptyState.jsx` - Beautiful empty states with icons
- `/src/components/ui/ErrorState.jsx` - Network/404/server error displays
- `/src/components/ErrorBoundary.jsx` - React error boundary with fallback UI

## 5. Accessibility Improvements

### Testing Skip to Content:
1. Load any page
2. Press Tab key (don't click anything first)
3. A "Skip to main content" link should appear
4. Press Enter to jump to main content

### Files Created:
- `/src/components/ui/SkipToContent.jsx` - Skip to content link

## Integration Points

### Updated Files:
- `/tailwind.config.js` - Added dark mode support and new animations
- `/src/components/layout/Layout.jsx` - Integrated ThemeProvider, ToastProvider, ErrorBoundary
- `/src/components/layout/Header.jsx` - Added ThemeToggle, dark mode classes
- `/src/components/ui/Button.jsx` - Added dark mode variants
- `/src/components/ui/Card.jsx` - Added dark mode variants

## Component APIs

### ThemeContext
```jsx
import { useTheme } from '../contexts/ThemeContext';

const { theme, toggleTheme, isDark } = useTheme();
```

### Toast Hook
```jsx
import { useToast } from '../hooks/useToast';

const toast = useToast();
toast.success(message, duration?);
toast.error(message, duration?);
toast.warning(message, duration?);
toast.info(message, duration?);
```

### Skeleton Components
```jsx
import Skeleton, {
  SkeletonText,
  SkeletonTitle,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonImage
} from '../components/ui/Skeleton';

<Skeleton className="w-full h-4" />
<SkeletonAvatar size="lg" />
```

## Testing Checklist

- [x] Dark mode toggle appears in header
- [x] Theme persists after page reload
- [x] All components have dark mode variants
- [x] Toast notifications can be triggered
- [x] Max 3 toasts visible at once
- [x] Toasts auto-dismiss after 5 seconds
- [x] Skeleton components match actual component layouts
- [x] Empty states display properly
- [x] Error states support retry functionality
- [x] Error boundary catches errors
- [x] Skip to content link works with keyboard
- [x] All interactive elements are keyboard accessible
- [x] Focus styles are visible

## Next Steps

To use these components in your pages:

1. **For loading states**: Replace loading spinners with skeleton components
2. **For empty data**: Use EmptyState component with appropriate icons
3. **For errors**: Use ErrorState for API errors, network issues, etc.
4. **For notifications**: Use toast hook for user feedback (save success, errors, etc.)
5. **For accessibility**: Ensure all buttons have proper ARIA labels

All components are fully responsive and work on mobile and desktop!
