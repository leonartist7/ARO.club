from pathlib import Path

p = Path("src/lib/routes.jsx")
t = p.read_text(encoding="utf-8")

if "MyBookingsPage" not in t:
    t = t.replace(
        "const ChatPage = lazy(() => import('../pages/ChatPage'));",
        "const ChatPage = lazy(() => import('../pages/ChatPage'));\nconst MyBookingsPage = lazy(() => import('../pages/MyBookingsPage'));",
    )

if "path: 'bookings'" not in t:
    insert = """      {
        path: 'bookings',
        element: <MyBookingsPage />,
      },
"""
    t = t.replace(
        "path: 'favorites',\n        element: <FavoritesPage />,\n      },",
        "path: 'favorites',\n        element: <FavoritesPage />,\n      },\n" + insert,
    )

p.write_text(t, encoding="utf-8")
print("routes ok", "MyBookingsPage" in t, "path: 'bookings'" in t)
