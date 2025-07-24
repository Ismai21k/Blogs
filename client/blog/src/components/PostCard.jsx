import React from 'react';
import { Link } from 'react-router-dom';


const PostCard = ({ post }) => {

  
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md overflow-hidden mb-6 hover:shadow-lg transition-shadow duration-300">
      {post.featuredImage && (
        <img
          src={`http://localhost:5000/uploads/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{post.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{post.excerpt}</p>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>By {post.author?.username || "Unknown"}</span>
          <span>{post.createdAt}</span>
        </div>

        <div className="mt-2 flex justify-between text-sm">
          <span className="text-blue-600">{post.viewCount} views</span>
          <span>{post.comments?.length || 0} comments</span>
        </div>

        <Link
          to={`/readmore/${post._id}`}
          className="inline-block mt-4 text-blue-500 hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
