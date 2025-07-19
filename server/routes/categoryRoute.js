const express = require('express');
const router = express.Router();
const { createCategory, getCategoryById, deleteCategory, getAllcategories } = require('../controllers/categoryController');


// create a new category
router
    .route('/category')
    .post(createCategory)
    .get(getAllcategories);


// get a specific category by id or delete
router
    .route('category/:id')
    .get(getCategoryById)
    .delete(deleteCategory);

module.exports = router;
