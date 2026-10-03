"use client";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { AuthProvider, PrototypeAuthProvider } from "../contexts/AuthContext";
import { isSupabaseConfigured } from "../lib/supabase";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import { RecentlyViewedProvider } from "../contexts/RecentlyViewedContext";
import { SavedSearchesProvider } from "../contexts/SavedSearchesContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";
import { usePlayerStore } from "../store/usePlayerStore";
export default function Providers({ children }: { children: ReactNode }) {
  const Account = isSupabaseConfigured ? AuthProvider : PrototypeAuthProvider;
  useEffect(() => {
    void usePlayerStore.persist.rehydrate();
  }, []);
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Account>
          <FavoritesProvider>
            <RecentlyViewedProvider>
              <SavedSearchesProvider>{children}</SavedSearchesProvider>
            </RecentlyViewedProvider>
          </FavoritesProvider>
        </Account>
      </ThemeProvider>
    </LanguageProvider>
  );
}
