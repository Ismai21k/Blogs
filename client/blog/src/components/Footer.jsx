// src/components/Footer.jsx
import React from 'react'; // ✅ Required for JSX

export const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-center py-4 text-sm mt-10">
      <div className="container mx-auto px-4">
        © {new Date().getFullYear()} <span className="font-semibold">Blogs</span>. All rights reserved.
      </div>
    </footer>
  );
};
