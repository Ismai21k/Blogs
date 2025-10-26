const Post = require('../models/Post');
const formatDate = require('../utils/formatDate');
const Category = require('../models/category');
const mongoose = require('mongoose');
const User = require('../models/User'); // Make sure this is present

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const featuredImage = req.file ? req.file.filename : 'default-post.jpg';
    console.log('FILE INFO:', req.file);
    console.log('POST INFO:', req.body);

    // 1. Find existing category or create a new one if it doesn't exist
    let category = await Category.findOne({
      name: req.body.categoryName || 'Uncategorized',
    });

    if (!category) {
      category = new Category({
        name: req.body.categoryName || 'Uncategorized',
      });
      await category.save();
    }

    // 2. Create the post with the category ID
    delete req.body.slug; // slug will be auto-generated

    const post = new Post({
      ...req.body,
      featuredImage,
      category: category._id,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: post,
    });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

exports.getBlog = async (req, res) => {
    try {
        const page     = parseInt(req.query.page  || '1', 10);
        const limit    = parseInt(req.query.limit || '10', 10);
        const category = req.query.category;
        

        const filter = category ? { category: category} : {};

        const [posts, total] = await Promise.all([
                Post.find({isPublished: true, filter:category})
                    .populate('author', 'username email')
                    .select('title excerpt slug featuredImage viewCount comments createdAt') // only summary fields
                    .sort({ createdAt: -1 })
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .lean(),                     // already plain JS
                Post.countDocuments(filter),
            ]);
        
        if (!posts || posts.length === 0) return res.status(404).json({
            success: false,
            message: 'No posts found'
        })

        const formattedPost = posts.map(post => ({
            ...post,

            createdAt: formatDate(post.createdAt)
        }))
        
        
        res.status(200).json({
            success: true,
            posts: formattedPost,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            
        })
    } catch (error) {
        console.log('Error fetching posts:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        })
    }
};

exports.getUserPosts = async (req, res) => {
  try {
    const page     = parseInt(req.query.page || '1', 10);
    const limit    = parseInt(req.query.limit || '10', 10);
    const userId   = req.params.id; // you can choose either way

    console.log(userId)

    // Construct filter: must match user, plus optional category
    const filter = {
      author: userId,
      
    };

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .populate('author', 'username email')
        .select('title excerpt content category isPublished tags slug featuredImage viewCount comments createdAt')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Post.countDocuments(filter),
    ]);

    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No posts found for this user.',
      });
    }

    const formattedPosts = posts.map(post => ({
      ...post,
      createdAt: formatDate(post.createdAt),
    }));

    res.status(200).json({
      success: true,
      posts: formattedPosts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
// Get a specific post by ID
exports.getSpecificBlog= async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id)
          .populate('author', 'username')
          // .populate('category', 'name')
          .populate({
            path: 'comments',
            populate: {
              path: 'user',
              select: 'username',
            },
          });

            // Check if post exists
        if (!post) return res.status(404).json({
            success: false,
            message: 'Post not found'
        });

        //Auto increment view count
        // Skip if it’s admin
        if (!req.user?.isAdmin) {
            await post.incrementViewCount();
        }


        const formattedPost = post.toObject();
        formattedPost.createdAt = formatDate(post.createdAt);
        res.status(200).json({
            sucess: true,
            post: formattedPost
        })
    } catch (error) {
        console.log('Error fetching post:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        })
    }
};

// Update a post by ID
exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true, runValidators: true }
        );
        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        const formattedPost = updatedPost.toObject();
        formattedPost.createdAt = formatDate(updatedPost.createdAt);
        res.status(200).json({
            success: true,
            post: formattedPost
        });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            
        });
    }
};

// Delete a post by ID
exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletdPost = await Post.findByIdAndDelete(id);
        if (!deletdPost) return res.status(404).json({
            success: false,
            message: 'Post not found'
        })
        res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        })
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            
        })
    }
    
};


exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    console.log('Adding comment:', comment);

    // Extract user ID from authentication middleware or body (fallback)
    const userId = req.user?.id || req.body.userId;
    console.log('User ID:', userId);

    // Validation: comment must be non-empty
    if (!comment || comment.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required',
      });
    }

    // Validation: user ID must be valid
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing user ID',
      });
    }

    // Validation: post ID must be valid
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID',
      });
    }

    // Find the post
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Add the comment using your model method
    await post.addComment(userId, comment);

    // Get updated post with populated user in comments (no lean to preserve Mongoose features)
    const updatedPost = await Post.findById(id)
      .populate('author', 'username')
      .populate('category', 'name')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username', // Only get the username field
        }
      });
    const newComment = updatedPost.comments.at(-1);

    console.log('New comment added by:', newComment);

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment: newComment, // singular and clear
    });

  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};