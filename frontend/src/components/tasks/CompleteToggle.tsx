'use client';

import React, { useState } from 'react';

interface CompleteToggleProps {
  taskId: number;
  initialCompleted: boolean;
  onToggle: (taskId: number, completed: boolean) => void;
}

export const CompleteToggle: React.FC<CompleteToggleProps> = ({
  taskId,
  initialCompleted,
  onToggle,
}) => {
  const [completed, setCompleted] = useState(initialCompleted);

  const handleToggle = () => {
    const newStatus = !completed;
    setCompleted(newStatus);
    onToggle(taskId, newStatus);
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-4 py-1 text-sm font-medium font-poppins transition-all duration-300
        ${completed 
          ? 'bg-green-600 text-white hover:bg-green-700' 
          : 'bg-yellow-600 text-white hover:bg-yellow-700'} 
        rounded-lg shadow-sm`}
    >
      {completed ? 'Completed' : 'Pending'}
    </button>
  );
};
