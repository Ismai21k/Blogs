import React, { useState } from 'react';
import { postService } from '../services/api.jsx';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';

const NewPost = () => {
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser);
  const [author] = useState(user?._id || '');
  const [featuredImage, setFeaturedImage] = useState(null);

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    excerpt: '',
    categoryName: '',
    tags: '',
    isPublished: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('excerpt', postData.excerpt);
    formData.append('categoryName', postData.categoryName);
    formData.append('tags', JSON.stringify(postData.tags.split(',').map(tag => tag.trim())));
    formData.append('isPublished', postData.isPublished);
    formData.append('author', author);
    if (featuredImage) {
      formData.append('featuredImage', featuredImage);
    }

    try {
      await postService.createPost(formData);
      navigate('/home');
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 ">
      <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      
      <div className="max-w-3xl mx-auto bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">✍️ Create a New Blog Post</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <input
            type="text"
            name="title"
            value={postData.title}
            onChange={handleChange}
            placeholder="Post Title"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />

          <textarea
            name="content"
            value={postData.content}
            onChange={handleChange}
            placeholder="Write your content here..."
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />

          <textarea
            name="excerpt"
            value={postData.excerpt}
            onChange={handleChange}
            placeholder="Short Excerpt (max 200 characters)"
            maxLength={200}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="text"
            name="categoryName"
            value={postData.categoryName}
            onChange={handleChange}
            placeholder="Category"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="text"
            name="tags"
            value={postData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-400"
          />

          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              name="isPublished"
              checked={postData.isPublished}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            Publish immediately
          </label>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Upload Featured Image</label>
            <input
              type="file"
              name="featuredImage"
              onChange={handleImageChange}
              accept=".png, .jpeg, .jpg"
              className="block w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition"
          >
            🚀 Publish Post
          </button>
        </form>
      </div>
      
    </div>
    <Footer />
    </div>
  );
};

export default NewPost;
