import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center rounded-lg shadow-inner">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">
        Welcome to Intellipaat Employee Portal
      </h1>
      <p className="text-gray-700 text-lg max-w-2xl mb-6">
        Manage your organization’s employees, departments, and HR information efficiently using this demo management system.
      </p>

      <div className="flex gap-4 mt-4">
        <Link
          to="/login"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md font-medium shadow"
        >
          Get Started
        </Link>
        <Link
          to="/about"
          className="bg-white text-blue-700 border border-blue-700 hover:bg-blue-50 px-6 py-2 rounded-md font-medium"
        >
          Learn More
        </Link>
      </div>

      <div className="mt-12 text-sm text-gray-500">
        Built with ❤️ using React + TailwindCSS
      </div>
    </div>
  );
}
