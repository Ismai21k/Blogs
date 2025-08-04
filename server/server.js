// server.js - Main server file for the MERN blog application

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const {connectDB} = require('./config/db');

// Load environment variables
dotenv.config();


// Import routes
const postRoutes = require('./routes/postRoute');
const categoryRoutes = require('./routes/categoryRoute');
const userRoutes =  require('./routes/userRoute');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

// Middleware
app.use(cors({ origin:'*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// serve static files from the 'uploads' directory
// this allows the server to serve files from the 'uploads' directory
// so that images can be accessed via URLs like http://localhost:5000/uploads/image.jpg
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Log requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// API routes
app.use('/', postRoutes);
app.use('/', userRoutes);
app.use('/', categoryRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('MERN Blog API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
});



app.listen(PORT, () => {
  console.log(`Server running on port:http://localhost:${PORT}`);
})