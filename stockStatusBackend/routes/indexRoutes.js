const express = require('express');
const router = express.Router();

// Import individual route modules
const authRoutes = require('./authRoutes');
const paintRoutes = require('./paintRoutes');
// Add more route imports as needed

// Use the individual route modules
router.use('/paints', paintRoutes);
router.use('/user', authRoutes);
// Add more router uses as needed

module.exports = router;
