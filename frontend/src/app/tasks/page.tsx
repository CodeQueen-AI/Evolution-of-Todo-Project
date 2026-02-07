'use client';

import React, { useEffect, useState } from 'react';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Navbar } from '@/components/Navbar';
import { TaskControls } from '@/components/tasks/TaskControls';
import fetcher from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import withAuth from '@/components/withAuth';

const TasksPage = () => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [sortBy, setSortBy] = useState<'created_at' | 'title' | 'status'>('created_at');
  const [tasks, setTasks] = useState<any[]>([]);
  const { user, loading } = useAuth();

  // ✅ Fetch tasks
  const fetchTasks = async () => {
    try {
      if (!user) return;
      const data = await fetcher(`/api/${user.email}/tasks`, { method: 'GET' });
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  // ✅ Fetch on user load
  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  // ✅ Add task
  const handleAddTask = async ({ title, description }: { title: string; description?: string }) => {
    if (!user) return;
    try {
      await fetcher(`/api/${user.email}/tasks`, {
        method: 'POST',
        body: JSON.stringify({ title, description }),
      });
      fetchTasks(); // refresh tasks after adding
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black font-poppins text-white">
      <Navbar />
      <main className="container mx-auto py-8">
  <h1 className="text-3xl font-extrabold text-white mb-6 text-center">
  My Tasks
</h1>


        {/* Task Form */}
        <TaskForm
          onSubmit={handleAddTask}
          className="p-6 text-white"
        />

        {/* Task Controls */}
        <TaskControls
          filter={filter}
          onFilterChange={setFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          className="mt-6 mb-6 text-white"
        />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          filter={filter}
          sortBy={sortBy}
          className="space-y-4"
        />
      </main>
    </div>
  );
};

export default withAuth(TasksPage);
