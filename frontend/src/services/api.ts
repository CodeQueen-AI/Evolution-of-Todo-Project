// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// interface RequestOptions extends RequestInit {
//   token?: string;
// }

// async function fetcher<T>(
//   endpoint: string,
//   options?: RequestOptions
// ): Promise<T> {
//   const headers: HeadersInit = {
//     'Content-Type': 'application/json',
//     ...options?.headers,
//   };

//   if (options?.token) {
//     headers['Authorization'] = `Bearer ${options.token}`;
//   }

//   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//     ...options,
//     headers,
//   });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({ message: response.statusText }));
//     throw new Error(errorData.message || 'Something went wrong');
//   }

//   // If response is 204 No Content, return null or an empty object
//   if (response.status === 204) {
//     return null as T;
//   }

//   return response.json();
// }

// export const createTask = async (token: string, title: string, description?: string) => {
//   return fetcher(`/tasks`, {
//     method: 'POST',
//     token,
//     body: JSON.stringify({ title, description }),
//   });
// };

// export const updateTask = async (token: string, taskId: number, data: { title?: string; description?: string; completed?: boolean }) => {
//   return fetcher(`/tasks/${taskId}`, {
//     method: 'PUT',
//     token,
//     body: JSON.stringify(data),
//   });
// };

// export const deleteTask = async (token: string, taskId: number) => {
//   return fetcher(`/tasks/${taskId}`, {
//     method: 'DELETE',
//     token,
//   });
// };

// export default fetcher;







// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// interface RequestOptions extends RequestInit {
//   token?: string;
// }

// async function fetcher<T>(
//   endpoint: string,
//   options?: RequestOptions
// ): Promise<T> {
//   const headers: HeadersInit = {
//     'Content-Type': 'application/json',
//     ...options?.headers,
//   };

//   let token = options?.token;
//   if (!token && typeof window !== 'undefined') { // Check if window is defined for client-side localStorage
//     token = localStorage.getItem('token') || undefined;
//   }

//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }

//   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//     ...options,
//     headers,
//   });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({ message: response.statusText }));
//     throw new Error(errorData.message || 'Something went wrong');
//   }

//   // If response is 204 No Content, return null or an empty object
//   if (response.status === 204) {
//     return null as T;
//   }

//   return response.json();
// }

// export const createTask = async (title: string, description?: string) => {
//   return fetcher(`/tasks`, {
//     method: 'POST',
//     body: JSON.stringify({ title, description }),
//   });
// };

// export const updateTask = async (taskId: number, data: { title?: string; description?: string; completed?: boolean }) => {
//   return fetcher(`/tasks/${taskId}`, {
//     method: 'PUT',
//     body: JSON.stringify(data),
//   });
// };

// export const deleteTask = async (taskId: number) => {
//   return fetcher(`/tasks/${taskId}`, {
//     method: 'DELETE',
//   });
// };

// export default fetcher;


// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// interface RequestOptions extends RequestInit {
//   token?: string;
// }

// async function fetcher<T>(
//   endpoint: string,
//   options?: RequestOptions
// ): Promise<T> {
//   const headers: HeadersInit = {
//     'Content-Type': 'application/json',
//     ...options?.headers,
//   };

//   let token = options?.token;

//   // ✅ Use correct key from localStorage
//   if (!token && typeof window !== 'undefined') {
//     token = localStorage.getItem('access_token') || undefined; 
//   }

//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }

//   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//     ...options,
//     headers,
//   });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({ message: response.statusText }));
//     throw new Error(errorData.message || 'Something went wrong');
//   }

//   if (response.status === 204) {
//     return null as T;
//   }

//   return response.json();
// }

// // ✅ Optional helper functions
// export const createTask = async (title: string, description?: string) => {
//   return fetcher(`/tasks`, {
//     method: 'POST',
//     body: JSON.stringify({ title, description }),
//   });
// };

// export const updateTask = async (taskId: number, data: { title?: string; description?: string; completed?: boolean }) => {
//   return fetcher(`/tasks/${taskId}`, {
//     method: 'PUT',
//     body: JSON.stringify(data),
//   });
// };

// export const deleteTask = async (taskId: number) => {
//   return fetcher(`/tasks/${taskId}`, {
//     method: 'DELETE',
//   });
// };

// export default fetcher;


import { getCookie } from '../lib/cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

interface RequestOptions extends RequestInit {
  token?: string;
}

async function fetcher<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // ✅ Use token from options or cookie
  let token = options.token;
  if (!token && typeof window !== 'undefined') {
    token = getCookie('access_token') || undefined;
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // ✅ Handle 204 No Content
  if (response.status === 204) {
    return null as T;
  }

  // ✅ Handle errors
  if (!response.ok) {
    let errorMessage = response.statusText;
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch (err) {
      // ignore parsing error
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

// ✅ Optional helper functions

export const createTask = async (title: string, description?: string) => {
  return fetcher(`/tasks`, {
    method: 'POST',
    body: JSON.stringify({ title, description }),
  });
};

export const updateTask = async (
  taskId: number,
  data: { title?: string; description?: string; completed?: boolean }
) => {
  return fetcher(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteTask = async (taskId: number) => {
  return fetcher(`/tasks/${taskId}`, {
    method: 'DELETE',
  });
};

export default fetcher;
