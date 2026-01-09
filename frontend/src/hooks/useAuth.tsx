// 'use client'
// import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
// import { User } from '../lib/types'; // Assuming User type is defined

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   signIn: (token: string, userEmail: string) => void;
//   signOut: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Function to sign in
//   const signIn = (token: string, userEmail: string) => {
//     localStorage.setItem('token', token);
//     setUser({ email: userEmail, name: userEmail }); // Set a basic user object
//   };

//   // Function to sign out
//   const signOut = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   useEffect(() => {
//     const checkAuth = async () => {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       if (token) {
//         // In a real app, you would validate the token with the backend
//         // and fetch user details. For now, we'll assume the token is valid
//         // and extract a dummy user email from it if possible, or just use a placeholder.
//         // For simplicity, we'll just set a dummy user if a token exists.
//         setUser({ email: 'authenticated@user.com', name: 'Authenticated User' });
//       }
//       setLoading(false);
//     };
//     checkAuth();
//   }, []);

//   const isAuthenticated = !!user;

//   const value = {
//     user,
//     isAuthenticated,
//     loading,
//     signIn,
//     signOut,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };



// 'use client'
// import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
// import { User } from '../lib/types'; // Assuming User type is defined

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   signIn: (token: string, userEmail: string) => void;
//   signOut: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Function to sign in
//   const signIn = (token: string, userEmail: string) => {
//     localStorage.setItem('access_token', token);  // ✅ use consistent key
//     localStorage.setItem('user_email', userEmail); // ✅ save email too
//     setUser({ email: userEmail, name: userEmail }); // set user state
//   };

//   // Function to sign out
//   const signOut = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('user_email');
//     setUser(null);
//   };

//   useEffect(() => {
//     const checkAuth = () => {
//       setLoading(true);
//       const token = localStorage.getItem('access_token');
//       const email = localStorage.getItem('user_email');
//       if (token && email) {
//         // ✅ now real email from localStorage
//         setUser({ email, name: email });
//       }
//       setLoading(false);
//     };
//     checkAuth();
//   }, []);

//   const isAuthenticated = !!user;

//   const value = {
//     user,
//     isAuthenticated,
//     loading,
//     signIn,
//     signOut,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };














// 'use client';
// import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
// import { User } from '../lib/types'; // Assuming User type is defined

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   signIn: (token: string, userEmail: string) => void;
//   signOut: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Function to sign in
//   const signIn = (token: string, userEmail: string) => {
//     localStorage.setItem('access_token', token);  // ✅ store token
//     localStorage.setItem('user_email', userEmail); // ✅ store email
//     setUser({ email: userEmail, name: userEmail });
//   };

//   // Function to sign out
//   const signOut = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('user_email');
//     setUser(null);
//   };

//   useEffect(() => {
//     const checkAuth = () => {
//       setLoading(true);
//       const token = localStorage.getItem('access_token');
//       const email = localStorage.getItem('user_email');

//       if (token && email) {
//         // ✅ set user only if token and email exist
//         setUser({ email, name: email });
//       }
//       setLoading(false);
//     };
//     checkAuth();
//   }, []);

//   const isAuthenticated = !!user;

//   const value = {
//     user,
//     isAuthenticated,
//     loading,
//     signIn,
//     signOut,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };




















'use client';

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { setCookie, getCookie, removeCookie } from '../lib/cookie';

// ✅ Simple User type
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
