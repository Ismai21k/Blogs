const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Blogs_images', // folder name in your Cloudinary dashboard
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const uploads = multer({ storage });

module.exports = uploads;
