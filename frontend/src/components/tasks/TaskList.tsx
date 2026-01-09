import React from 'react';
import useSWR from 'swr';
import { Task } from '@/lib/types';
import { TaskCard } from './TaskCard';
import fetcher from '@/services/api';

interface TaskListProps {
  filter?: 'all' | 'completed' | 'pending';
  sortBy?: 'created_at' | 'title' | 'status'; // Add more sort options as needed
}

export const TaskList: React.FC<TaskListProps> = ({ filter = 'all', sortBy = 'created_at' }) => {
  const { data: tasks, error, isLoading, mutate } = useSWR<Task[]>('/tasks', fetcher);

  const handleToggleComplete = async (taskId: number, completed: boolean) => {
    // Optimistic update
    const updatedTasks = tasks?.map(task =>
      task.id === taskId ? { ...task, completed } : task
    );
    mutate(updatedTasks, false); // Update local cache without revalidating immediately

    try {
      // Call API to update task completion
      await fetcher(`/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify({ completed }),
      });
      mutate(); // Revalidate cache after successful API call
    } catch (err) {
      console.error('Failed to toggle task completion:', err);
      mutate(); // Revert to server state on error
    }
  };

  const handleDelete = async (taskId: number) => {
    // Optimistic update
    const updatedTasks = tasks?.filter(task => task.id !== taskId);
    mutate(updatedTasks, false);

    try {
      // Call API to delete task
      await fetcher(`/tasks/${taskId}`, {
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
