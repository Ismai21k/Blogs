// api.js - API service for making requests to the backend

import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL
//https://blog-app-dbhw.onrender.com/
// Create axios instance with base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',// this a http header that tells the server that the request body is in json format
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Post API services
export const postService = {
  // Get all posts with optional pagination and filters
  getAllPosts: async (page = 1, limit = 10, category = null) => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (category) {
      url += `&category=${category}`;
    }
    const response = await api.get(url);
    return response.data;
  },

  getUserPosts: async (userId, page = 1, limit = 10, category = null) => {
    let url = `/posts/user/${userId}/?page=${page}&limit=${limit}`;
    if (category) {
      url += `&category=${category}`;
    }
    const response = await api.get(url);
    console.log('url :',url)
    return response.data;
  },

  // Get a single post by ID or slug
  getPost: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // Create a new post
  createPost: async (postData) => {
    const response = await api.post('/posts', postData, {
      headers: {
      'Content-Type': 'multipart/form-data',
    },
    });
    return response.data;
  },

  // Update an existing post
  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  // Delete a post
  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  // Add a comment to a post
  addComment: async (postId, commentData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token; // or user?.accessToken depending on your setup

    const payload = { comment: commentData }; // singular key
    
    
    const response = await api.post(`/posts/${postId}/comments`, payload,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    );
    return response.data;
  },

  // Increment view count for a post
  // incrementViewCount: async (postId) => {
  //   const response = await api.post(`/posts/${postId}/view`);
  //   return response.data;
  // },

  // Search posts
  searchPosts: async (query) => {
    const response = await api.get(`/posts/search?q=${query}`);
    return response.data;
  },
};

// Category API services
export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Create a new category
  createCategory: async (categoryData) => {
    const response = await api.post('/categories', categoryData,);
    return response.data;
  },

  //Delete Category
  deleteCategory: async (id) => {
    const response = await api.delete(`/category/${id}`);
    return response.data
  }
};

// Auth API services
export const authService = {
  // Register a new user
  register: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    if (response.data.token) {
      
      const { user, token } = response.data;
      localStorage.setItem('user', JSON.stringify({ ...user, token }));
     
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default api; 