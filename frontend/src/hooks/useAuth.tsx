'use client'
import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { User } from '../lib/types'; // Assuming User type is defined

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  // signIn: (token: string, user: User) => void;
  // signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // In a real app, you would check for a JWT token in cookies/localStorage here
  // and validate it to determine if the user is authenticated on initial load.
  useEffect(() => {
    // Simulate initial auth check
    const checkAuth = async () => {
      setLoading(true);
      // Example: fetch user data based on token
      // const token = Cookies.get('jwt-token');
      // if (token) {
      //   try {
      //     const userData = await fetchUser(token); // Replace with actual API call
      //     setUser(userData);
      //   } catch (error) {
      //     console.error('Failed to fetch user data:', error);
      //     setUser(null);
      //   }
      // }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const isAuthenticated = !!user;

  const value = {
    user,
    isAuthenticated,
    loading,
    // signIn,
    // signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
