import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Task } from '@/lib/types';

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: { title: string; description?: string }) => void;
  isSubmitting?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSubmit, isSubmitting }) => {
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
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">{initialTask ? 'Edit Task' : 'Add New Task'}</h2>
      <div className="space-y-4">
        <div>
          <Input
            id="task-title"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            id="task-description"
            placeholder="Task Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : initialTask ? 'Save Changes' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
};
