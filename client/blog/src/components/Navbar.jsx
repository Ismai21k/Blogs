
import { Link } from 'react-router-dom';


export const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">Blog Post</h1>

        {/* Optional future nav items */}
        <ul className="flex space-x-4 text-sm font-medium">
          <li><Link to='/home'>Latest Blog</Link></li>
          <li><Link>Read Blog</Link></li>
          <li><Link to='/newblog'>Create New Blog</Link></li>
          <li><Link>SignUp</Link></li>
          <li><Link>LogIn</Link></li>
        </ul>
      </div>
    </nav>
  );
};
