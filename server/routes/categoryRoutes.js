const express = require('express');
const router = express.Router();
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController');

router.get('/', getCategories);
router.post('/', createCategory); // Add Admin Auth middleware here if needed
router.delete('/:id', deleteCategory);

module.exports = router;