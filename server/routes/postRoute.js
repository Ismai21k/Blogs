const express = require('express');
const {createPost, getBlog, getSpecificBlog, updateBlog, deleteBlog} = require('../controllers/postController');
const upload = require('../middleware/Upload');

const router = express.Router();

// Use upload.single('featuredImage') for image upload

// Better: use the route-chaining pattern
router
  .route('/posts')
  .post(upload.single('featuredImage'), createPost) // upload + controller
  .get(getBlog);                                   // list all posts

router
  .route('/posts/:idOrSlug')
  .get(getSpecificBlog)
  .put(updateBlog)
  .delete(deleteBlog);



module.exports = router;