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

  async signupUser(req, res) {
    const params = req.body;
    if (isNullOrUndefined(params)) {
      return res.status(400).send('Email and password are required');
    }

    const { email, password } = params;
    const isValidateEmailAndPassword = isValidateEmailAndPass(email, password);

    if (isValidateEmailAndPassword.length > 0) {
      throw new InternalError(400, isValidateEmailAndPassword);
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    try {
      const userRef = db.collection('users').doc(email);
      const doc = await userRef.get();
      if (doc.exists) {
        throw new InternalError(400, 'User already exists');
      }

      const user = await userRef.set({
        email,
        password: hashedPassword,
        isActive: false
      });
      return user;
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    console.log('coming here', { email, password });

    try {
      const userRef = db.collection('users').doc(email);
      const doc = await userRef.get();
      if (!doc.exists) {
        throw new InternalError(400, 'User does not exist', doc);
      }

      const user = doc.data();
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new InternalError(401, 'Invalid credentials');
      }

      if (!user.isActive) {
        throw new InternalError(401, 'User is not active');
      }

      const token = jwt.sign(
        { email: user.email, role: user.role, name: user.name },
        JWT_SECRET,
        {
          expiresIn: '1h'
        }
      );
      return { token, email: user.email, role: user.roleId, name: user.name };
    } catch (error) {
      console.error('Error signing in:', error);
      throw new InternalError(401, 'Interal server error', error);
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
