import React from 'react';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300 ease-in-out">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 lg:py-12">{children}</main>

      <Footer />
    </div>
  )
}
