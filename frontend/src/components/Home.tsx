


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
