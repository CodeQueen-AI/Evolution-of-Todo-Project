import React from 'react';
import { Task } from '@/lib/types';
import Link from 'next/link';
import { CompleteToggle } from './CompleteToggle';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: number, completed: boolean) => void;
  onDelete: (taskId: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div className={`bg-white shadow overflow-hidden rounded-lg p-4 mb-4 flex items-center justify-between ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex-1">
        <Link href={`/tasks/${task.id}`} className="text-lg font-semibold text-indigo-600 hover:text-indigo-800">
          {task.title}
        </Link>
        {task.description && (
          <p className="text-gray-600 text-sm mt-1">{task.description}</p>
        )}
        <p className="text-gray-400 text-xs mt-2">
          Created: {new Date(task.created_at).toLocaleDateString()} | Updated: {new Date(task.updated_at).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <CompleteToggle
          taskId={task.id}
          initialCompleted={task.completed}
          onToggle={onToggleComplete}
        />
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
