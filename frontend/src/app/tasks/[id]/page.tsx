'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Task } from '@/lib/types';
import { Navbar } from '@/components/Navbar';
import { TaskForm } from '@/components/tasks/TaskForm';
import { CompleteToggle } from '@/components/tasks/CompleteToggle';
import fetcher from '@/services/api';
import { mutate } from 'swr';

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { data: task, error, isLoading } = useSWR<Task>(`/tasks/${id}`, fetcher);

  const handleUpdateTask = async ({ title, description }: { title: string; description?: string }) => {
    if (!task) return;
    try {
      await fetcher(`/tasks/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description, completed: task.completed }), // Maintain current completed status
      });
      mutate(`/tasks/${task.id}`); // Revalidate the single task
      mutate('/tasks'); // Revalidate the task list as well
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleToggleComplete = async (taskId: number, completed: boolean) => {
    if (!task) return;
    try {
      await fetcher(`/tasks/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify({ title: task.title, description: task.description, completed }),
      });
      mutate(`/tasks/${task.id}`);
      mutate('/tasks');
    } catch (err) {
      console.error('Failed to toggle task completion:', err);
    }
  };

  const handleDelete = async () => {
    if (!task) return;
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await fetcher(`/tasks/${task.id}`, {
          method: 'DELETE',
        });
        mutate('/tasks'); // Revalidate the task list
        router.push('/tasks'); // Redirect to task list after deletion
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading task...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Failed to load task: {error.message}</div>;
  if (!task) return <div className="text-center py-8 text-gray-500">Task not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Details</h1>

        <div className="bg-white shadow overflow-hidden rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{task.title}</h2>
            <div className="flex space-x-2">
              <CompleteToggle
                taskId={task.id}
                initialCompleted={task.completed}
                onToggle={handleToggleComplete}
              />
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{task.description || 'No description provided.'}</p>
          <p className="text-gray-500 text-sm">Created: {new Date(task.created_at).toLocaleString()}</p>
          <p className="text-gray-500 text-sm">Updated: {new Date(task.updated_at).toLocaleString()}</p>
        </div>

        <h3 className="text-xl font-semibold mb-4">Edit Task</h3>
        <TaskForm initialTask={task} onSubmit={handleUpdateTask} />
      </main>
    </div>
  );
}
