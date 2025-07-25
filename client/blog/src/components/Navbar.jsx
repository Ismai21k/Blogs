import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const isReadMore = location.pathname.startsWith("/readmore/");

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide">
          Blog Post
        </h1>

        <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 underline underline-offset-4"
                  : "hover:text-blue-500"
              }
            >
              Latest Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/readmore/1" // default or dummy
              className={
                isReadMore
                  ? "text-blue-500 underline underline-offset-4"
                  : "hover:text-blue-500"              }
            >
              Read Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newblog"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 underline underline-offset-4"
                  : "hover:text-blue-500"
              }
            >
              Create New Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/userblogs"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 underline underline-offset-4"
                  : "hover:text-blue-500"
              }
            >
              Blog Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 underline underline-offset-4"
                  : "hover:text-blue-500"
              }
            >
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 underline underline-offset-4"
                  : "hover:text-blue-500"
              }
            >
              Log In
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
