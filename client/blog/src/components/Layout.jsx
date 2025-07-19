// src/components/Layout.jsx
import React from 'react'; // ✅ Required for JSX
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-6">
        {children}
      </main>

      <Footer />
    </div>
  );
};
