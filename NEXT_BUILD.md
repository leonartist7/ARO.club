# 🚀 MASTER BUILD PROMPT FOR NEXT AI

Copy this entire section and paste it into a new Claude Code session to complete the remaining pages.

---

# Conversa - Complete Remaining Pages Build

I need you to build all the remaining placeholder pages for Conversa, a language learning marketplace. You have full context in the repository's documentation files.

## 📚 REQUIRED READING FIRST

Before you start, read these files in order:
1. **ARCHITECTURE.md** - Complete technical reference
2. **HANDOFF.md** - Setup instructions and action items
3. **README.md** - Project overview

## 🎯 YOUR MISSION

Build ALL remaining pages with full functionality using the existing mock data. Make them production-ready, beautiful, and fully responsive. Follow the exact same patterns, design system, and code quality as the existing `HomePage` and `ExplorePage`.

## 📋 PAGES TO BUILD (Priority Order)

### 1. ExperienceDetailPage (`/experience/:id`) - 3 hours

**Must have:**
- Hero section with large experience image
- Title, description, language, skill level badges
- Teacher mini-card (clickable to profile)
- "What You'll Learn" section (from `whatYoullLearn` array)
- "What's Included" section (from `included` array)
- Date, time, duration display
- Location details with map placeholder
- Price breakdown (single + couple with 15% discount)
- Spots remaining indicator
- "Book Now" button (alert for now)
- Reviews section (filter `reviews.json` by `experienceId`)
- "Related Experiences" carousel (same language or city)
- Fully responsive

**Data:** `experiences.json`, `teachers.json`, `reviews.json`

---

### 2. TeacherProfilePage (`/teacher/:id`) - 3 hours

**Must have:**
- Header: photo, name, location, rating, languages, stats
- About section (full bio)
- Specialties and certifications
- Upcoming experiences (filter by `teacherId`)
- Reviews section with rating breakdown
- "Book a Session" floating CTA
- Fully responsive

**Data:** `teachers.json`, `experiences.json`, `reviews.json`

---

### 3. StudentProfilePage (`/profile`) - 3 hours

**Must have:**
- Use first student from `students.json` as current user
- Profile header with edit button
- Gamification: points, level, progress bar to next level
- Badges showcase (earned + locked from `constants.js`)
- Languages learning with progress bars
- Stats grid (experiences, cities, teachers, reviews)
- Upcoming bookings
- Past experiences
- Favorite teachers
- Tabs for mobile

**Data:** `students.json`, `experiences.json`, `teachers.json`, `constants.js`

---

### 4. LeaderboardPage (`/leaderboard`) - 2 hours

**Must have:**
- Page title with filters (All Time, Month, Week)
- Top 3 podium (gold, silver, bronze styling)
- Rankings table (ranks 4-10)
- "Your Rank" highlighted card
- Badge showcase section
- Community stats
- Mobile responsive (table → cards)

**Data:** `students.json`, `constants.js`

---

### 5. TeacherDashboardPage (`/dashboard`) - 5 hours

**Must have:**
- Teacher-only check (use `useStore` isTeacher)
- Overview cards (earnings, sessions, rating)
- "Create Experience" form/modal with all fields
- My Experiences table (tabs: Upcoming, Past, Drafts)
- Edit/Delete functionality (Zustand)
- Reviews received
- Fully responsive

**Data:** `experiences.json`, `constants.js`, Zustand store

---

### 6. MapViewPage (`/map`) - 3 hours

**Must have:**
- Split layout: map (60%) + list (40%)
- Map placeholder with city markers
- Filter sidebar (reuse ExplorePage logic)
- Experience list (clickable cards)
- Mobile: toggle map/list view
- "Use My Location" button

**Data:** `experiences.json`, `constants.js` (CITIES)

---

### 7. HowItWorksPage (`/how-it-works`) - 2 hours

**Must have:**
- Hero section
- For Students steps (4 steps with icons)
- For Teachers steps (4 steps with icons)
- FAQ accordion (5-6 Q&A)
- Video placeholder
- Testimonials (use reviews data)
- CTAs
- Fully responsive

**Data:** `reviews.json` for testimonials

---

### 8. ForTeachersPage (`/for-teachers`) - 2 hours

**Must have:**
- Hero section
- Benefits cards (4-6 benefits)
- Interactive earnings calculator
- Requirements checklist
- How to get started (5 steps)
- Success stories (3 teachers)
- FAQ section
- "Apply Now" CTA
- Fully responsive

**Data:** `teachers.json` for success stories

---

### 9. AboutPage (`/about`) - 1 hour

**Must have:**
- Hero with mission
- Our Story section
- Founder section
- Team grid (6-8 members, create mock)
- Company values (4 cards)
- Impact stats (animated counters)
- Press mentions
- CTA section
- Fully responsive

**Data:** Static/mock content

---

### 10. FAQPage (`/faq`) - 2 hours

**Must have:**
- Page title
- Search bar (live filter)
- Category tabs
- Accordion component (20-25 Q&A pairs)
- "Still have questions?" CTA
- Fully responsive

**Data:** Create inline FAQ data

---

### 11. ContactPage (`/contact`) - 1 hour

**Must have:**
- Hero section
- Two-column layout:
  - Contact form (validated, shows success)
  - Contact info + map placeholder
- FAQ quick links
- Fully responsive

**Data:** Static content

---

### 12. NotFoundPage (`/404`) - 30 mins

**Must have:**
- 404 illustration/text
- Friendly message
- Search bar
- Featured experiences
- "Back to Home" button
- Fully responsive

**Data:** `experiences.json` (featured)

---

## 🎨 DESIGN REQUIREMENTS

### Must Follow:
- ✅ **Reuse components:** Button, Card, Badge, Input, Select, Avatar, LoadingSpinner
- ✅ **Use utilities:** `utils/helpers.js`, `utils/date.js`
- ✅ **Color scheme:** Primary #FF6B35, Secondary #20B2AA
- ✅ **Match quality:** Same level as HomePage/ExplorePage
- ✅ **Mobile-first:** Test all breakpoints
- ✅ **Animations:** Framer Motion for transitions
- ✅ **Accessibility:** Semantic HTML, ARIA labels
- ✅ **Loading states:** Skeletons/spinners
- ✅ **Empty states:** Helpful messages

### Component Pattern:
```jsx
import { motion } from 'framer-motion';

export default function YourPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Content */}
      </div>
    </motion.div>
  );
}
```

---

## ✅ QUALITY CHECKLIST

Before marking a page as done:

- [ ] Responsive: mobile (375px), tablet (768px), desktop (1280px)
- [ ] All images have alt text
- [ ] All buttons have hover states
- [ ] All links use React Router `<Link>`
- [ ] Loading states implemented
- [ ] Empty states show helpful messages
- [ ] Forms have validation
- [ ] Follows existing code patterns
- [ ] No console errors/warnings
- [ ] Uses existing UI components
- [ ] Smooth animations (60fps)
- [ ] Good text contrast
- [ ] Consistent spacing

---

## 🚫 WHAT NOT TO DO

- ❌ Don't connect real APIs (use mock data)
- ❌ Don't implement real auth (just UI)
- ❌ Don't implement real payments (modals only)
- ❌ Don't create new design patterns
- ❌ Don't install unnecessary packages
- ❌ Don't hardcode IDs in routes
- ❌ Don't duplicate components
- ❌ Don't write inline styles
- ❌ Don't forget mobile

---

## 📝 AFTER ALL PAGES

1. Update `lib/routes.jsx` with all imports
2. Test all navigation links
3. Add consistent page transitions
4. Add error boundaries
5. Verify lazy loading works
6. Check accessibility (tab navigation)
7. Test on mobile device
8. Create `COMPONENTS.md` documenting new components
9. Run final build: `npm run build`
10. Test production build: `npm run preview`

---

## 🎯 SUCCESS CRITERIA

When done, user should:
- ✅ Navigate to every page
- ✅ See professional, polished designs
- ✅ Use all filters/search features
- ✅ View complete experience details
- ✅ Browse teacher profiles
- ✅ See gamification working
- ✅ View leaderboard
- ✅ Explore map (even if placeholder)
- ✅ Read all static pages
- ✅ Use on mobile without issues
- ✅ See no errors

---

## 💪 YOU HAVE EVERYTHING

- ✅ Complete documentation (ARCHITECTURE.md, HANDOFF.md)
- ✅ High-quality examples (HomePage, ExplorePage)
- ✅ Comprehensive mock data (110+ records)
- ✅ Reusable UI components
- ✅ Utility functions
- ✅ Clear design system

**Estimated Time:** 20-25 hours
**Expected Result:** Production-ready pages

Start with **ExperienceDetailPage** (most important), then work through in order.

---

# 🚀 LET'S BUILD!
