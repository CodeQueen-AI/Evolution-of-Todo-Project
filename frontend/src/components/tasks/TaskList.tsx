'use client'
import React from 'react';
import useSWR from 'swr';
import { Task } from '@/lib/types';
import { TaskCard } from './TaskCard';
import fetcher from '@/services/api';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

interface TaskListProps {
  filter?: 'all' | 'completed' | 'pending';
  sortBy?: 'created_at' | 'title' | 'status'; // Add more sort options as needed
}

export const TaskList: React.FC<TaskListProps> = ({ filter = 'all', sortBy = 'created_at' }) => {
  const { isAuthenticated, user } = useAuth(); // Get isAuthenticated and user from useAuth

  // Custom fetcher that includes the token for authenticated requests
  const authenticatedFetcher = (url: string) => {
    return fetcher(url); // fetcher in api.ts now handles token automatically
  };

  const { data: tasks, error, isLoading, mutate } = useSWR<Task[]>(
    isAuthenticated && user ? `/api/${user.email}/tasks` : null, // Only fetch if isAuthenticated and user exists
    authenticatedFetcher
  );

  const handleToggleComplete = async (taskId: number, completed: boolean) => {
    if (!isAuthenticated || !user) return; // Prevent action if not authenticated or user is null

    // Optimistic update
    const updatedTasks = tasks?.map(task =>
      task.id === taskId ? { ...task, completed } : task
    );
    mutate(updatedTasks, false); // Update local cache without revalidating immediately

    try {
      // Call API to update task completion
      await fetcher(`/api/${user.email}/tasks/${taskId}/complete`, { // Use specific toggle endpoint
        method: 'PATCH', // Use PATCH method for toggling
      });
      mutate(); // Revalidate cache after successful API call
    } catch (err) {
      console.error('Failed to toggle task completion:', err);
      mutate(); // Revert to server state on error
    }
  };

  const handleDelete = async (taskId: number) => {
    if (!isAuthenticated || !user) return; // Prevent action if not authenticated or user is null

    // Optimistic update
    const updatedTasks = tasks?.filter(task => task.id !== taskId);
    mutate(updatedTasks, false);

    try {
      // Call API to delete task
      await fetcher(`/api/${user.email}/tasks/${taskId}`, { // Use user.email in the path
        method: 'DELETE',
      });
      mutate(); // Revalidate cache after successful API call
    } catch (err) {
      console.error('Failed to delete task:', err);
      mutate(); // Revert to server state on error
    }
  };

  const filteredTasks = tasks?.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const sortedTasks = filteredTasks?.sort((a, b) => {
    if (sortBy === 'created_at') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'status') {
      return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
    }
    return 0;
  });

  if (isLoading) return <div className="text-center py-8">Loading tasks...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Failed to load tasks: {error.message}</div>;
  if (!sortedTasks || sortedTasks.length === 0) return <div className="text-center py-8 text-gray-500">No tasks found.</div>;

  return (
    <div className="space-y-4">
      {sortedTasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
