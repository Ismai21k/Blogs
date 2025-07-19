const Post = require('../models/Post');
const formatDate = require('../utils/formatDate');
const Category = require('../models/category')

// Create a new post
exports.createPost = async (req, res) => {
    try {
    const featuredImage = req.file ? req.file.filename : 'default-post.jpg';
    console.log('FILE INFO:', req.file);

    // 1. Create a new category regardless of duplication
    const newCategory = new Category({
      name: req.body.categoryName || 'Uncategorized',
    });
    await newCategory.save();

    // 2. Create post and assign the new category's ID
    console.log('slug:', req.body.slug)
    delete req.body.slug // slug will be auto-generated
    const post = new Post({
      ...req.body,
      featuredImage,
      category: newCategory._id
    });
    console.log('slug:', post.slug)
    await post.save();
    console.log('slug:', post.slug)

    res.status(201).json({
      success: true,
      message: post
    });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};


exports.getBlog = async (req, res) => {
    try {
        const page     = parseInt(req.query.page  || '1', 10);
        const limit    = parseInt(req.query.limit || '10', 10);
        const category = req.query.category;

        const filter = category ? { category } : {};

        const [posts, total] = await Promise.all([
                Post.find(filter)
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

// Get a specific post by ID
exports.getSpecificBlog= async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.isValidObjectId(idOrSlug) 
            ? await Post.findById(idOrSlug)
            : await Post.findOne({ slug: idOrSlug });

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
        cosole.error('Error deleting post:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            
        })
    }
    
};


exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;       // or use req.user.id if you have auth

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required',
      });
    }

    if (!mongoose.isValidObjectId(postId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID',
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // the model method you already wrote
    await post.addComment(userId, content);

    // you might want to populate the commenter’s name/email for the response
    const updatedPost = await Post.findById(postId)
      .populate('comments.user', 'username email');  // pick the fields you need
      res.status(201).json({
      success: true,
      post: updatedPost,           // or just return updatedPost.comments if lighter
    });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
