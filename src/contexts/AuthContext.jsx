import { createContext, useContext, useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase, supabaseConfigError } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return undefined;
    }

    // Session readiness must not depend on the optional profile/role lookup.
    // A slow Data API request previously left every protected screen on its
    // spinner forever, even though Supabase had already authenticated the
    // user. Role-gated screens remain safe: they still require `profile`.
    const applySession = (session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setLoading(false);
        void loadProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    };

    // Get initial session. A failed local-session read must also release the
    // app shell; it is equivalent to no usable session.
    let authEventRevision = 0;
    const sessionRevision = authEventRevision;
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        // Never let a slower initial read overwrite a newer sign-in/out
        // event. This is particularly visible in a fresh browser context.
        if (authEventRevision === sessionRevision) applySession(session);
      })
      .catch(() => {
        if (authEventRevision === sessionRevision) applySession(null);
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      authEventRevision += 1;
      applySession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId) => {
    try {
      const [profileResult, roleResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.schema('api').from('current_user_role').select('role').eq('user_id', userId).single(),
      ]);

      if (profileResult.error) throw profileResult.error;
      if (roleResult.error) throw roleResult.error;
      const role = roleResult.data.role === 'participant' ? 'student' : roleResult.data.role;
      setProfile({ ...profileResult.data, role, is_teacher: role === 'teacher' });
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ({ email, password, name, photo = '' }) => {
    if (!isSupabaseConfigured) {
      return { user: null, error: supabaseConfigError };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            photo,
          },
        },
      });

      if (error) throw error;

      // Profile will be created automatically by the database trigger
      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  };

  const signIn = async ({ email, password }) => {
    if (!isSupabaseConfigured) {
      return { user: null, error: supabaseConfigError };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      return { data: null, error: supabaseConfigError };
    }

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      setUser(null);
      setProfile(null);
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: supabaseConfigError };
    }

    try {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile((current) => ({ ...current, ...data }));
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const resetPassword = async (email) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: supabaseConfigError };
    }

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const updatePassword = async (newPassword) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: supabaseConfigError };
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const value = {
    user,
    profile,
    loading,
    isBackendConfigured: isSupabaseConfigured,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile,
    resetPassword,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
