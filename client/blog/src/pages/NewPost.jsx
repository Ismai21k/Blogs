import React, { useState, useEffect } from 'react';
import { postService } from '../services/api.jsx';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser);
  const [author, setAuthor] = useState(user?._id || '');

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    excerpt: '',
    categoryName: '',
    tags: '',
    isPublished: false,
  });

  const [featuredImage, setFeaturedImage] = useState(null);
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleChange}
          placeholder="Post Title"
          className="w-full mb-3 p-2 border"
          required
        />

        <textarea
          name="content"
          value={postData.content}
          onChange={handleChange}
          placeholder="Post Content"
          className="w-full mb-3 p-2 border"
          required
        />

        <textarea
          name="excerpt"
          value={postData.excerpt}
          onChange={handleChange}
          placeholder="Short Excerpt (max 200 characters)"
          className="w-full mb-3 p-2 border"
          maxLength={200}
        />

        <input
          type="text"
          name="categoryName"
          value={postData.categoryName}
          onChange={handleChange}
          placeholder="Category"
          className="w-full mb-3 p-2 border"
          required
        />

        <input
          type="text"
          name="tags"
          value={postData.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full mb-3 p-2 border"
        />

        <label className="flex items-center mb-3">
          <input
            type="checkbox"
            name="isPublished"
            checked={postData.isPublished}
            onChange={handleChange}
            className="mr-2"
          />
          Publish now
        </label>

        <input
          type="file"
          name="featuredImage"
          onChange={handleImageChange}
          accept=".png, .jpeg, .jpg"
          className="mb-3"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
