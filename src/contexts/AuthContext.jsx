'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { isSupabaseConfigured, supabase, supabaseConfigError } from '../lib/supabase';

import {useRouter} from 'next/navigation';
import {usePlayerStore} from '../store/usePlayerStore';
import {useStore} from '../store/useStore';
function clearAccountState() {
  usePlayerStore.getState().signOut();
  useStore.setState({currentUser: null, isTeacher: false, bookings: [], teacherExperiences: [], notifications: []});
}
const AuthContext = createContext(null);

const prototypeBlocked = async () => ({ data: null, user: null, error: supabaseConfigError });

const prototypeAuthValue = {
  user: null,
  profile: null,
  loading: false,
  isBackendConfigured: false,
  signUp: prototypeBlocked,
  signIn: prototypeBlocked,
  signInWithGoogle: prototypeBlocked,
  signOut: async () => undefined,
  updateProfile: prototypeBlocked,
  resetPassword: prototypeBlocked,
  updatePassword: prototypeBlocked,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const router=useRouter();
  const activeUser=useRef(null);
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
      if (usePlayerStore.getState().user?.id !== session?.user?.id) clearAccountState();
      activeUser.current=session?.user?.id??null;
      setProfile(null);
      setUser(session?.user ?? null);
      if (session?.user) {
        setLoading(false);
        queueMicrotask(()=>{void loadProfile(session.user.id);});
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
      if (_event === 'SIGNED_OUT') {
        clearAccountState();
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const loadProfile = async (userId) => {
    try {
      const [profileResult, roleResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.schema('api').from('current_user_role').select('role').eq('user_id', userId).single(),
      ]);

      if (profileResult.error) throw profileResult.error;
      if (roleResult.error) throw roleResult.error;
      const role = roleResult.data.role === 'participant' ? 'student' : roleResult.data.role;
      if(activeUser.current!==userId)return;
      setProfile({ ...profileResult.data, role, is_teacher: role === 'teacher' });
      usePlayerStore.getState().signIn({
        id: userId,
        name: profileResult.data.name,
        photo: profileResult.data.photo,
        role,
        isTeacher: role === 'teacher',
      });
    } catch (error) {
      if(activeUser.current===userId)setProfile(null);
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
          emailRedirectTo: window.location.origin+'/auth/callback',
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

  const signInWithGoogle = async () => ({data:null,error:new Error('Google sign-in is not enabled. Please use email and password.')});

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      setUser(null);
      setProfile(null);
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      activeUser.current=null;
      setUser(null);
      setProfile(null);
      clearAccountState();
      router.refresh();
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
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
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

/** Static, network-free account boundary used while UX0 prototype mode is active. */
export const PrototypeAuthProvider = ({ children }) => (
  <AuthContext.Provider value={prototypeAuthValue}>{children}</AuthContext.Provider>
);

export default AuthContext;
