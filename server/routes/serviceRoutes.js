const express = require('express');
const router = express.Router();
const { getServices, createService, deleteService } = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getServices);
router.post('/',protect, createService); // Add Admin Auth middleware here if needed
router.delete('/:id', deleteService);

module.exports = router;