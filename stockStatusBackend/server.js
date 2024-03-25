require('dotenv').config();
global.__basedir = __dirname;
const base_path = __basedir;

const express = require('express');

const app = express();
app.use(express.json());
const cors = require('cors'); // Import the 'cors' package

app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Initialize 'cors' as middleware
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'http://localhost:';
const { initializeFirebaseApp } = require('./config/config');

// Initialize Firebase Admin SDK
initializeFirebaseApp();

// Import routes
const indexRoutes = require('./routes/indexRoutes');

// Use Routes
app.use('/api', indexRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}${PORT}`);
});
