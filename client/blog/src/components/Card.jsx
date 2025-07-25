import React from 'react';

export const Card = ({
  children,
  className = "",
  variant = "default", // "default" | "bordered" | "transparent"
  ...props
}) => {
  const base =
    "rounded-2xl p-6 md:p-8 transition-all duration-300 ease-in-out";

  const variants = {
    default:
      "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-lg hover:shadow-xl",
    bordered:
      "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md",
    transparent:
      "bg-transparent text-zinc-900 dark:text-zinc-100 shadow-none hover:shadow-none",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
