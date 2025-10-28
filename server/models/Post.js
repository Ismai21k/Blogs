// Post.js - Mongoose model for blog posts

const mongoose = require('mongoose');

// Post Schema definition 
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    featuredImage: {
      type: String,
      default: 'default-post.jpg',
    },
    slug: {
      type: String,
      unique: true,
    },
    excerpt: {
      type: String,
      maxlength: [200, 'Excerpt cannot be more than 200 characters'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    tags: [String],
    isPublished: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// validate ensures the slug is available before validation and save, even in dev environments.
PostSchema.pre('validate', function (next) {
  if (!this.isModified('title')) {
    console.log('Title not modified. Skipping slug generation.');
    return next();
  }

  // Step 1: Normalize Unicode forms (handle accents)
  let title = this.title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

  // Step 2: Convert fancy mathematical letters to plain ASCII equivalents
  title = title.replace(/[\u{1D400}-\u{1D7FF}]/gu, c => {
    const code = c.codePointAt(0);

    // Uppercase A–Z (Mathematical Bold/Italic/Script etc.)
    if (code >= 0x1D400 && code <= 0x1D419) return String.fromCharCode(code - 0x1D400 + 0x41);
    // Lowercase a–z
    if (code >= 0x1D41A && code <= 0x1D433) return String.fromCharCode(code - 0x1D41A + 0x61);

    return ''; // remove unsupported
  });

  console.log('Normalized Title:', title);

  // Step 3: Generate clean slug
  this.slug = title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]+/gu, '')  // keep unicode letters/numbers
    .trim()
    .replace(/\s+/g, '-')                // spaces → hyphens
    .replace(/-+/g, '-');                // collapse multiple dashes

  next();
});

// Virtual for post URL
PostSchema.virtual('url').get(function () {
  return `/posts/${this.slug}`;
});

// Method to add a comment
PostSchema.methods.addComment = function (userId, content) {
  this.comments.push({ user: userId, content });
  return this.save();
};

// Method to increment view count
PostSchema.methods.incrementViewCount = function () {
  this.viewCount += 1;
  return this.save();
};


module.exports = mongoose.model('Post', PostSchema);
// const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
// module.exports = Post;
// In development with hot reload (e.g., nodemon, Next.js, Vite), Mongoose can register the model multiple times and detach the pre-save hooks.