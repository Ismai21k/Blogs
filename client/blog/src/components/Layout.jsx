import React from 'react';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 ease-in-out">
      <Navbar />

      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-10">
        {children}
      </main>

      <Footer />
    </div>
  );
};
