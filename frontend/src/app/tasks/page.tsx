'use client';

import React, { useState } from 'react';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Navbar } from '@/components/layout/Navbar';
import { TaskControls } from '@/components/tasks/TaskControls'; // Import TaskControls
import fetcher from '@/services/api';
import { mutate } from 'swr'; // Import mutate from swr

export default function TasksPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [sortBy, setSortBy] = useState<'created_at' | 'title' | 'status'>('created_at');

  const handleAddTask = async ({ title, description }: { title: string; description?: string }) => {
    try {
      await fetcher('/tasks', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
      });
      mutate('/tasks'); // Revalidate the task list after adding
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Tasks</h1>

        <TaskForm onSubmit={handleAddTask} />

        <TaskControls
          filter={filter}
          onFilterChange={setFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />

        <TaskList filter={filter} sortBy={sortBy} />
      </main>
    </div>
  );
}
