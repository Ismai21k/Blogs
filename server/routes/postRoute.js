const express = require('express');
const {createPost, getBlog, getSpecificBlog, updateBlog, deleteBlog, addComment, getUserPosts, previewBlog} = require('../controllers/postController');
const upload = require('../middleware/Upload');
const router = express.Router();
const protect = require('../middleware/Protect');
const uploads = require('../config/multer');

// Use upload.single('featuredImage') for image upload

// Better: use the route-chaining pattern
router
  .route('/posts')
  .post(uploads.single('featuredImage'), createPost) // upload + controller
  .get(getBlog);                                  
router
  .route('/posts/:id')
  .get(getSpecificBlog)
  .put(updateBlog)
  .delete(deleteBlog);

// Server-side preview route for social crawlers
router.get('/posts/:id/preview', previewBlog);



router
   .route('/posts/:id/comments')
   .post(protect,addComment);

router
   .route('/posts/user/:id')
   .get(getUserPosts)
   
   



module.exports = router;