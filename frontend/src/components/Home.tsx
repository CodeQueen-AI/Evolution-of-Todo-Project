// // src/components/Home.tsx
// 'use client';
// import React from 'react';

// export default function HomePage() {
//   return (
//     <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 p-6 relative overflow-hidden">

//       {/* Decorative Floating Shapes */}
//       <div className="absolute top-10 left-10 w-12 h-12 bg-blue-300 rounded-full opacity-50 animate-bounce-slow"></div>
//       <div className="absolute bottom-20 right-20 w-8 h-8 bg-green-300 rounded-full opacity-60 animate-bounce-slower"></div>
//       <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-purple-300 rounded-full opacity-40 animate-bounce-slowest"></div>
//       <div className="absolute top-1/3 left-2/3 w-10 h-10 bg-pink-300 rounded-full opacity-50 animate-bounce-slow"></div>

//       {/* Left Side: Text */}
//       <div className="md:w-1/2 w-full text-center md:text-left mb-8 md:mb-0 z-10">
//         <h1 className="text-5xl font-bold text-gray-800 mb-4">Organize Your Tasks</h1>
//         <p className="text-gray-700 mb-6">
//           Stay productive, track your todos, and manage your day efficiently with our simple and smart todo app.
//         </p>
//         <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
//           Get Started
//         </button>
//       </div>

//       {/* Right Side: Mini Todo Cards */}
//       <div className="md:w-1/2 w-full flex flex-col gap-4 items-center z-10">
//         <div className="w-64 p-4 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">
//           <h2 className="font-semibold text-gray-800">Buy Groceries</h2>
//           <p className="text-gray-500 text-sm">Remember to buy milk and bread</p>
//         </div>
//         <div className="w-64 p-4 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">
//           <h2 className="font-semibold text-gray-800">Read Book</h2>
//           <p className="text-gray-500 text-sm">Finish reading your favorite chapter</p>
//         </div>
//         <div className="w-64 p-4 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">
//           <h2 className="font-semibold text-gray-800">Workout</h2>
//           <p className="text-gray-500 text-sm">Complete 30 mins of cardio</p>
//         </div>
//       </div>
//     </div>
//   );
// }
















// src/components/Home.tsx
'use client';

import React from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function HomePage() {
  return (
    <div
      className={`${poppins.className} min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden`}
    >
      {/* Subtle Glow Background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Center Content */}
      <div className="text-center max-w-4xl z-10">
        {/* Hero Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Organize & Track Your <br />
          <span className="text-purple-500">Todos Effortlessly</span>
        </h1>

        {/* Hero Paragraph */}
        <p className="text-white text-lg md:text-xl mb-10">
          Manage your tasks efficiently with our full-stack Todo application. 
          Add, track, and complete tasks seamlessly to stay productive and focused every day.
        </p>

        {/* Get Started Button */}
        <button
          className="
            px-10
            py-4
            rounded-full
            bg-purple-600
            text-white
            text-lg
            font-medium
            border
            border-purple-600
            transition-all
            duration-300
            shadow-[0_0_25px_rgba(168,85,247,0.6)]
            hover:bg-white
            hover:text-purple-600
            hover:border-purple-600
            hover:shadow-[0_0_35px_rgba(168,85,247,0.9)]
          "
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
