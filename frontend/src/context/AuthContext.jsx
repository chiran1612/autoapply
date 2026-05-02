import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const checkUser = async () => {
      if (import.meta.env.VITE_AUDIT_MODE === 'true') {
        setUser({ id: 'test-user-id', email: 'audit-user@example.com' });
        setSession({ access_token: 'mock-token' });
        setLoading(false);
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser();

    // Listen for changes on auth state (login, logout, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (email, password) => {
    if (import.meta.env.VITE_AUDIT_MODE === 'true') {
      setUser({ id: 'test-user-id', email: 'audit-user@example.com' });
      setSession({ access_token: 'mock-token' });
      return Promise.resolve({ data: { user: { id: 'test-user-id' } }, error: null });
    }
    return supabase.auth.signInWithPassword({ email, password });
  };
  const logout = () => supabase.auth.signOut();
  const signup = (email, password) => supabase.auth.signUp({ email, password });

  return (
    <AuthContext.Provider value={{ user, session, loading, login, logout, signup }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
