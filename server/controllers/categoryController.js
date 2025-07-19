const Category = require('../models/category');

// Create a new category

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category: category
        })
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            
        })
    }
};

// get specific category by id

exports.getCategoryById = async (req, res) => {
    try{
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) return res.status(404).json({
            success: false,
            message: 'Category not found'
        })

        res.status(200).json({
            success: true,
            category
        });
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            
        })
    }
};

// Delete a category by id

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) return res.status(404).json({
            success: false,
            message: 'Category not found'

        });

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            
        })
    }
};

// get all categories
exports.getAllcategories = async (req, res) => {
    try {
        const categories = await Category.find();
        
        if (!categories || categories.length === 0) return res.status(404).json({
            success: false,
            message: 'No categories found'
        })

        res.status(200).json({
            sucess: true,
            categories
        })

        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({
                success: false,
                message:' Server Error'
            })
        }
    }
