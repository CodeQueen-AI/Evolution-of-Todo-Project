'use client';

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { setCookie, getCookie, removeCookie } from '../lib/cookie';

export interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (token: string, userEmail: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Sign in: save token + email in cookies
  const signIn = (token: string, userEmail: string) => {
    setCookie('access_token', token, 7);
    setCookie('user_email', userEmail, 7);
    setUser({ email: userEmail, name: userEmail });
  };

  // ✅ Sign out: remove token + email from cookies
  const signOut = () => {
    removeCookie('access_token');
    removeCookie('user_email');
    setUser(null);
  };

  // ✅ Check if user already logged in
  useEffect(() => {
    const token = getCookie('access_token');
    const email = getCookie('user_email');

    if (token && email) {
      setUser({ email, name: email });
    }
    setLoading(false);
  }, []);

  const isAuthenticated = !!user;

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
