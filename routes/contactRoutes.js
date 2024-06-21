// routes/contactRoutes.js
const express = require('express');
const { markSpam, searchByName, searchByPhoneNumber } = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/mark-spam', authMiddleware, markSpam);
router.get('/search-by-name', authMiddleware, searchByName);
router.get('/search-by-phone', authMiddleware, searchByPhoneNumber);

module.exports = router;
