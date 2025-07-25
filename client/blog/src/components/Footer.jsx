import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-center py-6 text-sm mt-16 shadow-inner">
      <div className="container mx-auto px-4">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-zinc-800 dark:text-zinc-100 hover:underline transition">
          Blogs
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};
