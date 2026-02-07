import fetcher from './api';

interface AuthResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

// ✅ Sign In
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  return fetcher<AuthResponse>('/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

// ✅ Sign Up
export const signUp = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  return fetcher<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
};

// ✅ Sign Out
export const signOut = async (): Promise<void> => {
  // Agar real app → cookie/localStorage clear karna hoga
  console.log('User signed out.');
  return Promise.resolve();
};

// ✅ Fetch current user info (me route)
export const fetchUser = async (token: string): Promise<AuthResponse['user']> => {
  return fetcher<AuthResponse['user']>('/auth/me', {
    method: 'GET',
    token: token,
  });
};
