'use client';

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
    <div className="flex flex-col sm:flex-row justify-start items-center mb-6 bg-black p-2 font-poppins text-white gap-3">

      {/* Filter Dropdown */}
      <div className="w-36">
        <label htmlFor="filter" className="sr-only">Filter tasks</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value as 'all' | 'completed' | 'pending')}
          className="w-full bg-black border border-purple-600 text-white text-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Sort Dropdown */}
      <div className="w-36">
        <label htmlFor="sortBy" className="sr-only">Sort tasks by</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value as 'created_at' | 'title' | 'status')}
          className="w-full bg-black border border-purple-600 text-white text-sm px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="created_at">Sort by Date</option>
          <option value="title">Sort by Title</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

    </div>
  );
};
