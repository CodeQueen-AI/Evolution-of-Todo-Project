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
