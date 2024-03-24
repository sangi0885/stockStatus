const admin = require('firebase-admin');
const db = admin.firestore();
const auth = admin.auth();

// User signup service
async function signUp(email, password) {
  try {
    const userRecord = await auth.createUser({
      email: email,
      password: password
    });
    return userRecord.uid;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
}

// User login service
async function login(email, password) {
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (userRecord) {
      await auth.signInWithEmailAndPassword(email, password);
      return userRecord.uid;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw new Error('Error logging in: ' + error.message);
  }
}

// User logout service
async function logout() {
  try {
    await auth.signOut();
    return 'User logged out successfully';
  } catch (error) {
    throw new Error('Error logging out: ' + error.message);
  }
}

module.exports = { signUp, login, logout };
