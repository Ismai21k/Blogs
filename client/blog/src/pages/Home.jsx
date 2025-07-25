import React, { useEffect, useState } from 'react';
import { postService } from '../services/api.jsx';
import PostCard from '../components/PostCard.jsx';
import { Layout } from '../components/Layout.jsx';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAllPosts();
        setPosts(data.posts);

        if (data.posts.length === 0) {
          alert('No posts available at the moment.');
        } else {
          console.log('Posts:', data.posts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        alert('Failed to load posts.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
          Published Blogs
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Explore insightful posts from our community.
        </p>
      </div>
      
      
      <div className="grid grid-cols-1 gap-10 px-0.1 py-4 ">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
