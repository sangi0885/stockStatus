const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isNullOrUndefined = require('../utils/nullOrUndefined');
const {
  isValidateEmailAndPass,
  isValidateUserToBeUpdated
} = require('../utils/validators');
const InternalError = require('../errorHandlers/InternalError');

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const db = admin.firestore();

class UserService {
  constructor() {
    this.userCollection = db.collection('users');
  }

  async getAllUsers() {
    const snapshot = await this.userCollection.get();
    const users = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  }

  async loginUser(req, res) {
    const { username } = req.body;
    console.log('coming here', { username });

    try {
      const userRef = db.collection('users').where('username', '==', username);
      const snapshot = await userRef.get();

      if (snapshot.empty) {
        return res.status(401).json({ error: 'User does not exist' });
      }

      let user = {};
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        user = doc.data();
      });

      if (!user.isActive) {
        return res.status(401).json({ error: 'User is not active' });
      }

      const token = jwt.sign({ username: username }, JWT_SECRET, {
        expiresIn: '1h'
      });

      res.status(200).json({
        token,
        email: user.email,
        role: user.role,
        name: user.name,
        username: user.username
      });
    } catch (error) {
      console.error('Error signing in:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateUser(updatedUser) {
    const userInfo = updatedUser;

    const isValidInfo = isValidateUserToBeUpdated(userInfo);
    if (isValidInfo.length > 0) {
      throw new InternalError(404, isValidInfo);
    }

    try {
      const data = await this.userCollection
        .doc(userInfo.userId)
        .update(userInfo);
      return data;
    } catch (error) {
      console.error('Error updating user inventory:', error);
      throw error;
    }
  }

  async doesUserExists(id) {
    try {
      const userRef = db.collection('users').doc(id);
      console.log('userRef:', userRef);
      const doc = await userRef.get();
      if (!doc.exists) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }
}

module.exports = UserService;
