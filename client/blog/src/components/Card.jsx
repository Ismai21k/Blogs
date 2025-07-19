import React from 'react'; // ✅ Required for JSX


export const Card = ({
  children,
  className = "",
  variant = "default", // "default" | "bordered" | "transparent"
  ...props
}) => {
  const base = "rounded-lg p-4 shadow-md";

  const variants = {
    default: "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
    bordered:
      "bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100",
    transparent: "bg-transparent shadow-none",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
