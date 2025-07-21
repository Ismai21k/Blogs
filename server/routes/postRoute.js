const express = require('express');
const {createPost, getBlog, getSpecificBlog, updateBlog, deleteBlog, addComment} = require('../controllers/postController');
const upload = require('../middleware/Upload');
const router = express.Router();
const protect = require('../middleware/Protect');

// Use upload.single('featuredImage') for image upload

// Better: use the route-chaining pattern
router
  .route('/posts')
  .post(upload.single('featuredImage'), createPost) // upload + controller
  .get(getBlog);                                   // list all posts

router
  .route('/posts/:id')
  .get(getSpecificBlog)
  .put(updateBlog)
  .delete(deleteBlog);


router
   .route('/posts/:id/comments')
   .post(protect,addComment);
   



module.exports = router;