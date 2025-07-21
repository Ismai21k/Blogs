import React, { useEffect, useState } from 'react';
import { postService } from '../services/api.jsx';
import PostCard from '../components/PostCard.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';


const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAllPosts();
        setPosts(data.posts);

        if (data.length === 0) {
          alert('No posts available at the moment.');
        } else {
          
          console.log('Posts:', data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        alert('Failed to load posts.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-2xl mb-4">Published Blog</h1>
      <div className="grid gap-4">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
