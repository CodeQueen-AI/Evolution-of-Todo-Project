// import fetcher from './api';

// const AUTH_API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL || 'http://localhost:8000';

// interface AuthResponse {
//   token: string;
//   user: {
//     name: string;
//     email: string;
//   };
// }

// export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
//   const response = await fetcher<AuthResponse>(`${AUTH_API_BASE_URL}/auth/signin`, {
//     method: 'POST',
//     body: JSON.stringify({ email, password }),
//   });
//   // In a real app, you would store the token (e.g., in http-only cookie)
//   return response;
// };

// export const signUp = async (name: string, email: string, password: string): Promise<AuthResponse> => {
//   const response = await fetcher<AuthResponse>(`${AUTH_API_BASE_URL}/auth/signup`, {
//     method: 'POST',
//     body: JSON.stringify({ name, email, password }),
//   });
//   // In a real app, you would store the token (e.g., in http-only cookie)
//   return response;
// };

// export const signOut = async (): Promise<void> => {
//   // In a real app, you would clear the token (e.g., from http-only cookie)
//   console.log('User signed out.');
//   return Promise.resolve();
// };

// export const fetchUser = async (token: string): Promise<AuthResponse['user']> => {
//   const response = await fetcher<AuthResponse['user']>(`${AUTH_API_BASE_URL}/auth/me`, {
//     method: 'GET',
//     token: token,
//   });
//   return response;
// }


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
