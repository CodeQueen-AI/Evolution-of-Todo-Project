'use client'

import React from "react";
import { FaCheckCircle, FaTasks, FaChartLine, FaMobileAlt } from "react-icons/fa";

const features = [
  {
    title: "Add & Manage Tasks",
    description: "Quickly add, edit, and delete your daily tasks easily",
    icon: <FaTasks className="text-4xl mb-4 text-purple-400" />,
  },
  {
    title: "Track Progress",
    description: "Mark tasks as complete and visualize your productivity",
    icon: <FaCheckCircle className="text-4xl mb-4 text-purple-400" />,
  },
  {
    title: "Organize Categories",
    description: "Group tasks into categories to keep everything organized",
    icon: <FaChartLine className="text-4xl mb-4 text-purple-400" />,
  },
  {
    title: "Responsive Design",
    description: "Works beautifully on mobile, tablet, and desktop screens",
    icon: <FaMobileAlt className="text-4xl mb-4 text-purple-400" />,
  },
];

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-black font-poppins">
      <h1 className="text-5xl font-mono mb-16 text-center text-white">
       Features
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 cursor-pointer">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative bg-black border-2 border-purple-600 p-8 flex flex-col items-center text-center shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            {feature.icon}
            <h2 className="text-2xl font-semibold mb-3 text-white">{feature.title}</h2>
            <p className="text-white">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
