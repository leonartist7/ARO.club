import { create } from 'zustand';

/**
 * Global app store using Zustand
 */
export const useStore = create((set, get) => ({
  // UI State
  isMobileMenuOpen: false,
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),

  // User State (mock - will be replaced with auth)
  currentUser: null,
  isTeacher: false,
  setCurrentUser: (user) => set({ currentUser: user }),
  setIsTeacher: (isTeacher) => set({ isTeacher }),

  // Search & Filter State
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  filters: {
    language: '',
    city: '',
    priceMin: 0,
    priceMax: 100,
    skillLevel: '',
    dateFrom: null,
    dateTo: null,
  },
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () =>
    set({
      filters: {
        language: '',
        city: '',
        priceMin: 0,
        priceMax: 100,
        skillLevel: '',
        dateFrom: null,
        dateTo: null,
      },
    }),

  // Sort State
  sortBy: 'date',
  setSortBy: (sortBy) => set({ sortBy }),

  // Bookings (mock state)
  bookings: [],
  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, { ...booking, id: Date.now() }],
    })),

  // Teacher's Experiences (mock state for dashboard)
  teacherExperiences: [],
  addTeacherExperience: (experience) =>
    set((state) => ({
      teacherExperiences: [
        ...state.teacherExperiences,
        { ...experience, id: Date.now() },
      ],
    })),
  updateTeacherExperience: (id, updates) =>
    set((state) => ({
      teacherExperiences: state.teacherExperiences.map((exp) =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    })),
  deleteTeacherExperience: (id) =>
    set((state) => ({
      teacherExperiences: state.teacherExperiences.filter(
        (exp) => exp.id !== id
      ),
    })),

  // Notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: Date.now(), read: false },
      ],
    })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      ),
    })),
  clearNotifications: () => set({ notifications: [] }),

  // Advanced Filters (for state management - can be used later for SSR or persistence)
  advancedFilters: {
    weekend: false,
    accessible: false,
    petFriendly: false,
    foodIncluded: false,
    indoorOutdoor: 'all',
    groupSize: 'all',
    timeOfDay: [],
    experienceTypes: [],
  },
  setAdvancedFilter: (key, value) =>
    set((state) => ({
      advancedFilters: { ...state.advancedFilters, [key]: value },
    })),
  resetAdvancedFilters: () =>
    set({
      advancedFilters: {
        weekend: false,
        accessible: false,
        petFriendly: false,
        foodIncluded: false,
        indoorOutdoor: 'all',
        groupSize: 'all',
        timeOfDay: [],
        experienceTypes: [],
      },
    }),
}));
