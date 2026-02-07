'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Task } from '@/lib/types';

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: { title: string; description?: string }) => void;
  isSubmitting?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialTask,
  onSubmit,
  isSubmitting,
}) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title, description: description.trim() || undefined });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black p-6 shadow-md mb-6 text-white font-poppins rounded-xl"
    >
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4 text-center">
        {initialTask ? 'Edit Task' : 'Add New Task'}
      </h2>

      <div className="space-y-4">
        {/* Task Title */}
        <Input
          id="task-title"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-black text-white placeholder-purple-400 border border-purple-600 focus:ring-purple-500 focus:border-purple-500 rounded-lg px-4 py-2 w-full"
        />

        {/* Task Description */}
        <textarea
          id="task-description"
          placeholder="Task Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="block w-full px-4 py-2 bg-black text-white border border-purple-600 rounded-lg shadow-sm placeholder-purple-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        ></textarea>

        {/* Centered Submit Button */}
        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-600 text-white font-semibold rounded-lg px-6 py-1.5 text-sm border border-purple-600 transition-all duration-300 hover:bg-black hover:text-purple-500 hover:border-purple-500"
          >
            {isSubmitting ? 'Saving...' : initialTask ? 'Save Changes' : 'Add Task'}
          </Button>
        </div>
      </div>
    </form>
  );
};
