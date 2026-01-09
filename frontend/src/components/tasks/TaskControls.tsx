import React from 'react';

interface TaskControlsProps {
  filter: 'all' | 'completed' | 'pending';
  onFilterChange: (filter: 'all' | 'completed' | 'pending') => void;
  sortBy: 'created_at' | 'title' | 'status';
  onSortByChange: (sortBy: 'created_at' | 'title' | 'status') => void;
}

export const TaskControls: React.FC<TaskControlsProps> = ({
  filter,
  onFilterChange,
  sortBy,
  onSortByChange,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <label htmlFor="filter" className="sr-only">Filter tasks</label>
        <select
          id="filter"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value as 'all' | 'completed' | 'pending')}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label htmlFor="sortBy" className="sr-only">Sort tasks by</label>
        <select
          id="sortBy"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value as 'created_at' | 'title' | 'status')}
        >
          <option value="created_at">Sort by Date</option>
          <option value="title">Sort by Title</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>
    </div>
  );
};
