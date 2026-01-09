export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  name: string;
  email: string;
}
