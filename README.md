# 👅 TongueConnect

**Learn languages through real experiences with local teachers in cities around the world.**

TongueConnect connects language learners with local teachers for small group (4-6 people) experiences in authentic settings like cafés, markets, walking tours, and cultural activities.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## ✨ Features

### ✅ Currently Implemented
- 🏠 **Beautiful Homepage** with hero, featured experiences, and animated stats
- 🔍 **Advanced Search & Filtering** by language, city, skill level, and price
- 📊 **Comprehensive Mock Data** (35+ experiences, 15 teachers, 50+ reviews, 10 students)
- 🎨 **Modern Design System** with Tailwind CSS and custom theme
- 📱 **Fully Responsive** design for mobile, tablet, and desktop
- 🧩 **Reusable Component Library** (Button, Card, Badge, Input, Avatar, etc.)
- 🗺️ **10 Cities** across the globe (Paris, Tokyo, New York, Barcelona, and more)
- 🌍 **10 Languages** (French, Spanish, Japanese, Korean, German, and more)

### 🚧 Coming Soon
- 🔐 Authentication (Supabase Auth)
- 💳 Payment processing (Stripe)
- 🗺️ Interactive map view (Google Maps)
- 👤 User profiles and dashboards
- 🏆 Gamification (points, badges, leaderboard)
- 📧 Email notifications
- 💬 Teacher-student messaging

---

## 📚 Documentation

**👉 See [HANDOFF.md](./HANDOFF.md) for complete documentation including:**
- Detailed feature list
- Architecture overview
- Setup instructions for Supabase, Google Maps, and Stripe
- Remaining work and time estimates
- Design system documentation
- API integration guides

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS v3
- **Routing:** React Router v6
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Date Handling:** date-fns

---

## 📁 Project Structure

```
src/
├── components/
│   ├── features/     # ExperienceCard, TeacherCard
│   ├── layout/       # Header, Footer, Layout
│   └── ui/           # Button, Card, Badge, Input, etc.
├── data/             # Mock JSON data
├── pages/            # Route pages
├── store/            # Zustand state management
├── utils/            # Helper functions
└── lib/              # Configuration (routes)
```

---

## 🎨 Design System

### Colors
- **Primary:** Coral Orange (#FF6B35)
- **Secondary:** Teal (#20B2AA)

### Typography
- **Headings:** Poppins (600-800)
- **Body:** Inter (300-700)

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy!

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_GOOGLE_MAPS_KEY=your_google_maps_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

---

## 📝 Next Steps

1. **Set up Supabase** for backend and authentication
2. **Get Google Maps API key** for map features
3. **Configure Stripe** for payments
4. **Build remaining pages** (see HANDOFF.md)
5. **Deploy to Vercel**
6. **Launch beta!** 🎉

---

## 📊 Progress

**Overall:** ~40% Complete

- ✅ Foundation & Infrastructure
- ✅ Design System
- ✅ Mock Data
- ✅ Homepage
- ✅ Explore Page
- 🚧 Remaining pages (~30-40 hours)
- 🚧 Backend integration
- 🚧 Authentication
- 🚧 Payments

---

## 🤝 Contributing

This is an MVP in active development. Contributions welcome!

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🎯 Vision

TongueConnect makes language learning social, practical, and fun. We connect curious learners with passionate local teachers for authentic cultural experiences that actually improve fluency.

**Learn a language. Make friends. Experience the world.** 🌍✨
