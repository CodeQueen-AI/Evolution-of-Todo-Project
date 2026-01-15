// 'use client';

// import React, { useState } from 'react';
// import { TaskList } from '@/components/tasks/TaskList';
// import { TaskForm } from '@/components/tasks/TaskForm';
// import { Navbar } from '@/components/layout/Navbar';
// import { TaskControls } from '@/components/tasks/TaskControls'; // Import TaskControls
// import fetcher from '@/services/api';
// import { mutate } from 'swr'; // Import mutate from swr
// import { useAuth } from '@/hooks/useAuth'; // Import useAuth

// export default function TasksPage() {
//   const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
//   const [sortBy, setSortBy] = useState<'created_at' | 'title' | 'status'>('created_at');
//   const { user } = useAuth(); // Get user from useAuth

//   const handleAddTask = async ({ title, description }: { title: string; description?: string }) => {
//     if (!user) {
//       console.error('User not authenticated.');
//       return;
//     }
//     try {
//       await fetcher(`/${user.email}/tasks`, { // Use user.email as user_id in the path
//         method: 'POST',
//         body: JSON.stringify({ title, description }),
//       });
//       mutate(`/${user.email}/tasks`); // Revalidate the task list after adding
//     } catch (error) {
//       console.error('Failed to add task:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <main className="container mx-auto py-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">My Tasks</h1>

//         <TaskForm onSubmit={handleAddTask} />

//         <TaskControls
//           filter={filter}
//           onFilterChange={setFilter}
//           sortBy={sortBy}
//           onSortByChange={setSortBy}
//         />

//         <TaskList filter={filter} sortBy={sortBy} />
//       </main>
//     </div>
//   );
// }



// 'use client';

// import React, { useState, useEffect } from 'react';
// import { TaskList } from '@/components/tasks/TaskList';
// import { TaskForm } from '@/components/tasks/TaskForm';
// import { Navbar } from '@/components/layout/Navbar';
// import { TaskControls } from '@/components/tasks/TaskControls';
// import fetcher from '@/services/api';
// import { useAuth } from '@/hooks/useAuth';

// export default function TasksPage() {
//   const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
//   const [sortBy, setSortBy] = useState<'created_at' | 'title' | 'status'>('created_at');
//   const [tasks, setTasks] = useState<any[]>([]);
//   const { user } = useAuth();

//   const fetchTasks = async () => {
//     if (!user) return;
//     try {
//       const data = await fetcher(`/${user.email}/tasks`, { method: 'GET' });
//       setTasks(data);
//     } catch (error) {
//       console.error('Failed to fetch tasks:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [user]);

//   const handleAddTask = async ({ title, description }: { title: string; description?: string }) => {
//     if (!user) return;
//     try {
//       await fetcher(`/${user.email}/tasks`, {
//         method: 'POST',
//         body: JSON.stringify({ title, description }),
//       });
//       fetchTasks(); // refresh tasks after adding
//     } catch (error) {
//       console.error('Failed to add task:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <main className="container mx-auto py-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">My Tasks</h1>

//         <TaskForm onSubmit={handleAddTask} />

//         <TaskControls
//           filter={filter}
//           onFilterChange={setFilter}
//           sortBy={sortBy}
//           onSortByChange={setSortBy}
//         />

//         <TaskList tasks={tasks} filter={filter} sortBy={sortBy} />
//       </main>
//     </div>
//   );
// }











// 'use client';

// import React, { useState, useEffect } from 'react';
// import { TaskList } from '@/components/tasks/TaskList';
// import { TaskForm } from '@/components/tasks/TaskForm';
// import { Navbar } from '@/components/layout/Navbar';
// import { TaskControls } from '@/components/tasks/TaskControls';
// import fetcher from '@/services/api';
// import { useAuth } from '@/hooks/useAuth';

// export default function TasksPage() {
//   const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
//   const [sortBy, setSortBy] = useState<'created_at' | 'title' | 'status'>('created_at');
//   const [tasks, setTasks] = useState<any[]>([]);
//   const { user, loading } = useAuth(); // ✅ get loading state

//   const fetchTasks = async () => {
//     if (!user) return;
//     try {
//       const data = await fetcher(`/${user.email}/tasks`, { method: 'GET' });
//       setTasks(data);
//     } catch (error) {
//       console.error('Failed to fetch tasks:', error);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchTasks(); // ✅ only fetch when user is loaded
//   }, [user]);

//   const handleAddTask = async ({ title, description }: { title: string; description?: string }) => {
//     if (!user) return;
//     try {
//       await fetcher(`/${user.email}/tasks`, {
//         method: 'POST',
//         body: JSON.stringify({ title, description }),
//       });
//       fetchTasks(); // refresh tasks after adding
//     } catch (error) {
//       console.error('Failed to add task:', error);
//     }
//   };

//   // ✅ handle loading & not authenticated
//   if (loading) {
//     return <p className="text-center py-20 text-gray-500">Loading...</p>;
//   }

//   if (!user) {
//     return <p className="text-center py-20 text-red-500">You must sign in to view tasks.</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <main className="container mx-auto py-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">My Tasks</h1>

//         <TaskForm onSubmit={handleAddTask} />

//         <TaskControls
//           filter={filter}
//           onFilterChange={setFilter}
//           sortBy={sortBy}
//           onSortByChange={setSortBy}
//         />

//         <TaskList tasks={tasks} filter={filter} sortBy={sortBy} />
//       </main>
//     </div>
//   );
// }













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
    // if (!user) return;
    try {
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

        <TaskList tasks={tasks} filter={filter} sortBy={sortBy} />
      </main>
    </div>
  );
}
export default withAuth(TasksPage);
