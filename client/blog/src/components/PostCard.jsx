import React from 'react';


const PostCard = ({ post }) => {
  return (
    <div>
    <div className="border p-4 rounded shadow">
    
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-600">{post.excerpt}</p>
      <p className="text-sm text-right mt-2">By authors Id {post.author}</p>
    </div>
    </div>
  );
};

export default PostCard;
