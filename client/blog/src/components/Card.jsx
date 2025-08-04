

export const Card = ({
  children,
  className = "",
  variant = "default", // "default" | "bordered" | "transparent" | "glass"
  ...props
}) => {
  const base = "rounded-3xl transition-all duration-300 ease-in-out"

  const variants = {
    default:
      "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-800 p-6 md:p-8",
    bordered:
      "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600 p-6 md:p-8",
    transparent: "bg-transparent text-gray-900 dark:text-gray-100 shadow-none hover:shadow-none p-6 md:p-8",
    glass:
      "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl text-gray-900 dark:text-gray-100 shadow-2xl hover:shadow-3xl border border-white/20 dark:border-gray-700/50 p-6 md:p-8",
  }

  return (
    <div className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}
