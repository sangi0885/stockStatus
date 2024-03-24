require('dotenv').config();
global.__basedir = __dirname;
const base_path = __basedir;

const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;
const { initializeFirebaseApp } = require('./config/config');
initializeFirebaseApp();

const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middlewares/authMiddleware');
// Initialize Firebase Admin SDK

// Import routes
const indexRoutes = require('./routes/indexRoutes');

// Use Routes
app.use('/api', indexRoutes);

// Example of a protected route
app.get('/protected', verifyToken, (req, res) => {
  res.send('You have accessed a protected route');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
