// Import Firebase Admin SDK
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get a reference to the Firestore service
const admin = require('firebase-admin');
const db = admin.firestore();

// Function to create a new user document in the Firestore collection
async function createUser(userInfo) {
  try {
    // Hash the password (You'll need to implement this part using a hashing library like bcrypt)
    const hashedPassword = hashPassword(userInfo.password);

    // Create a new user object with hashed password and isActive set to false
    const newUser = {
      email: userInfo.email,
      password: hashedPassword,
      isActive: false
      // Add any other user info fields as needed
    };

    // Add the new user document to the 'users' collection
    const userRef = await db.collection('users').add(newUser);

    console.log('User created with ID: ', userRef.id);
    return userRef.id;
  } catch (error) {
    console.error('Error creating user: ', error);
    throw error;
  }
}

// Function to hash the password (You'll need to implement this part using a hashing library like bcrypt)
function hashPassword(password) {
  // Implement password hashing here
}

// Example usage:
const userInfo = {
  email: 'example@example.com',
  password: 'password123'
  // Add any other user info fields as needed
};

createUser(userInfo);
