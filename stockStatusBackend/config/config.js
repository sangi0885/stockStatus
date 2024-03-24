const admin = require('firebase-admin');
const serviceAccount = require('../secrets/learning-136a6-bfe1ef794b4a.json');

// Firebase configuration
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://learning-136a6-default-rtdb.firebaseio.com'
};

// Initialize Firebase App
const initializeFirebaseApp = () => {
  admin.initializeApp(firebaseConfig);
};

module.exports = {
  initializeFirebaseApp
};
