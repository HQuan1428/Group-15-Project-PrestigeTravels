const express = require('express');
const router = express.Router();
const { searchTours } = require('../../Controllers/userControllers/tourController');

// Tìm kiếm tour
router.get('/search', searchTours);

module.exports = router;
