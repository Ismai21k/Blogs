import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Eye, MessageCircle } from 'lucide-react';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-700">
      {post.featuredImage && (
        <img
          src={`http://localhost:5000/uploads/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-52 object-cover"
        />
      )}

      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug tracking-tight">
          {post.title}
        </h2>

        <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span>By {post.author?.username || "Anonymous"}</span>
          <span className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-blue-600 dark:text-blue-400 mt-2">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {post.viewCount} views
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {post.comments?.length || 0} comments
          </span>
        </div>

        <div>
          <Link
            to={`/readmore/${post._id}`}
            className="inline-block mt-4 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
