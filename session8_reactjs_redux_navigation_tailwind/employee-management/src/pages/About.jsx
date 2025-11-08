import React from "react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">About This App</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        The <strong>Employee Management Application</strong> is a React-based system designed to simplify HR tasks.
        It allows administrators to manage employees, view department-wise statistics, and edit profiles efficiently.
      </p>

      <p className="text-gray-700 mb-4 leading-relaxed">
        This project demonstrates modern frontend development practices using{" "}
        <strong>React, React Router, Context API</strong> and <strong>TailwindCSS</strong>.
        The backend is built with <strong>Node.js</strong> using an in-memory data model for easy learning.
      </p>

      <p className="text-gray-700 leading-relaxed">
        It’s ideal for learning state management, protected routes, and CRUD integration with APIs.
        You can use it as a foundation for larger enterprise systems.
      </p>

      <div className="mt-6 border-t border-gray-200 pt-4 text-gray-500 text-sm">
        Version: <strong>1.0.0</strong> | Developed by <span className="font-medium text-gray-700">Lakshmikant Deshpande</span>
      </div>
    </div>
  );
}
