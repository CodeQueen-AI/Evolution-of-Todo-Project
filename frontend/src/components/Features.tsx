'use client'

import React from "react";
import { FaCheckCircle, FaTasks, FaChartLine, FaMobileAlt } from "react-icons/fa";

const features = [
  {
    title: "Add & Manage Tasks",
    description: "Quickly add, edit, and delete your daily tasks easily.",
    icon: <FaTasks className="text-4xl mb-4 text-purple-400" />,
  },
  {
    title: "Track Progress",
    description: "Mark tasks as complete and visualize your productivity.",
    icon: <FaCheckCircle className="text-4xl mb-4 text-purple-400" />,
  },
  {
    title: "Organize Categories",
    description: "Group tasks into categories to keep everything organized.",
    icon: <FaChartLine className="text-4xl mb-4 text-purple-400" />,
  },
  {
    title: "Responsive Design",
    description: "Works beautifully on mobile, tablet, and desktop screens.",
    icon: <FaMobileAlt className="text-4xl mb-4 text-purple-400" />,
  },
];

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-black font-poppins">
      <h1 className="text-5xl font-bold mb-16 text-center text-white">
        TickDone Features
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-r from-purple-700 via-purple-900 to-purple-700 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-2xl opacity-0 hover:opacity-30 transition duration-500"></div>

            <div className="relative z-10 flex flex-col items-center">
              {feature.icon}
              <h2 className="text-2xl font-semibold mb-3 text-white">{feature.title}</h2>
              <p className="text-gray-200">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
