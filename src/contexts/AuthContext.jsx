'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { isSupabaseConfigured, supabase, supabaseConfigError } from '../lib/supabase';
import { safeReturnPath } from '../lib/auth/config';
import { AUTH_RETURN_COOKIE, lifecycleEnabled, MIN_PASSWORD_LENGTH } from '../lib/auth/lifecycle';

import {useRouter} from 'next/navigation';
import {usePlayerStore} from '../store/usePlayerStore';
import {useStore} from '../store/useStore';
function rememberAuthReturn(returnTo) {
  const next = safeReturnPath(returnTo);
  document.cookie = `${AUTH_RETURN_COOKIE}=${encodeURIComponent(next)}; Path=/auth/callback; Max-Age=600; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`;
}
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
  resendConfirmation: prototypeBlocked,
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
  const profileRevision=useRef(0);
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
    let disposed = false;
    let revision = 0;
    const applySession = async (session) => {
      const version = ++revision;
      const profileVersion = ++profileRevision.current;
      if (activeUser.current !== (session?.user?.id ?? null)) {
        clearAccountState();
        setProfile(null);
        setUser(null);
      }
      if (session?.user && lifecycleEnabled) {
        try {
          const access = await supabase.schema('api').rpc('account_access_status');
          if (disposed || version !== revision) return;
          if (access.error || !access.data?.active) session = null;
          else if (!access.data.eligible) {
            activeUser.current = session.user.id;
            setUser(session.user);
            setProfile(null);
            clearAccountState();
            setLoading(false);
            return;
          }
        } catch { session = null; }
      }
      if (disposed || version !== revision) return;
      if (activeUser.current !== (session?.user?.id ?? null)) clearAccountState();
      activeUser.current=session?.user?.id??null;
      setUser(session?.user ?? null);
      if (session?.user) {
        setLoading(false);
        queueMicrotask(()=>{void loadProfile(session.user.id, profileVersion);});
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
      revision += 1;
      profileRevision.current += 1;
      // Supabase auth callbacks must return before a query asks for its token.
      queueMicrotask(() => { if (!disposed) void applySession(session); });
      if (_event === 'SIGNED_OUT') {
        clearAccountState();
        router.refresh();
      }
    });

    const revalidate = () => {
      if (disposed || !activeUser.current || document.visibilityState === 'hidden' || !lifecycleEnabled) return;
      const version = revision;
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!disposed && version === revision) void applySession(session);
      }).catch(() => { if (!disposed && version === revision) void applySession(null); });
    };
    window.addEventListener('focus', revalidate);
    document.addEventListener('visibilitychange', revalidate);
    const interval = window.setInterval(revalidate, 60_000);
    return () => {
      disposed = true;
      revision += 1;
      profileRevision.current += 1;
      activeUser.current = null;
      subscription.unsubscribe();
      window.clearInterval(interval);
      window.removeEventListener('focus', revalidate);
      document.removeEventListener('visibilitychange', revalidate);
    };
  }, [router]);

  const loadProfile = async (userId, version) => {
    if (activeUser.current !== userId || profileRevision.current !== version) return;
    try {
      const [profileResult, roleResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.schema('api').from('current_user_role').select('role').eq('user_id', userId).single(),
      ]);

      if (profileResult.error) throw profileResult.error;
      if (roleResult.error) throw roleResult.error;
      const role = roleResult.data.role === 'participant' ? 'student' : roleResult.data.role;
      if(activeUser.current!==userId || profileRevision.current !== version)return;
      setProfile({ ...profileResult.data, role, is_teacher: role === 'teacher' });
      usePlayerStore.getState().signIn({
        id: userId,
        name: profileResult.data.name,
        photo: profileResult.data.photo,
        role,
        isTeacher: role === 'teacher',
      });
    } catch {
      if(activeUser.current===userId && profileRevision.current === version) { setProfile(null); clearAccountState(); }
    } finally {
      if (activeUser.current === userId && profileRevision.current === version) setLoading(false);
    }
  };

  const signUp = async ({ email, password, name, photo = '', returnTo = '/explore' }) => {
    if (!isSupabaseConfigured) {
      return { user: null, error: supabaseConfigError };
    }

    try {
      if (password.length < MIN_PASSWORD_LENGTH) throw new Error('Use at least eight characters.');
      rememberAuthReturn(returnTo);
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: window.location.origin+'/auth/callback',
          data: {
            name: name.trim(),
            photo,
          },
        },
      });

      if (error) throw error;

      // Profile will be created automatically by the database trigger
      return { user: data.user, session: data.session, error: null };
    } catch (error) {
      return { user: null, error };
    }
  };

  const resendConfirmation = async (email, returnTo = '/explore') => {
    if (!isSupabaseConfigured) return { data: null, error: supabaseConfigError };
    try {
      rememberAuthReturn(returnTo);
      return await supabase.auth.resend({
        type: 'signup', email: email.trim(),
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
    } catch (error) { return { data: null, error }; }
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

  const signInWithGoogle = async (returnTo = '/explore') => {
    if (!isSupabaseConfigured) {
      return { data: null, error: supabaseConfigError };
    }

    try {
      const callback = `${window.location.origin}/auth/callback`;
      rememberAuthReturn(returnTo);
      return await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: callback },
      });
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

    const { error } = await supabase.auth.signOut({ scope: 'global' });
    if (error) throw error;
    activeUser.current=null;
    profileRevision.current += 1;
    setUser(null);
    setProfile(null);
    clearAccountState();
    router.refresh();
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
      if (activeUser.current !== user.id) throw new Error('The signed-in account changed. Please try again.');
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
      const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        // The email template appends token_hash/type with ?, so the base must
        // have no query. The callback routes recovery tokens to the reset form.
        redirectTo: `${window.location.origin}/auth/callback`,
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
      if (newPassword.length < MIN_PASSWORD_LENGTH) throw new Error('Use at least eight characters.');
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
    resendConfirmation,
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
