const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const db = admin.firestore();

const router = express.Router();

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

// SignUp Route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    const userRef = db.collection('users').doc(email);
    const doc = await userRef.get();
    if (doc.exists) {
      return res.status(400).send('User already exists');
    }
    await userRef.set({
      email,
      password: hashedPassword,
      isActive: false
    });
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// SignIn Route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRef = db.collection('users').doc(email);
    const doc = await userRef.get();
    if (!doc.exists) {
      return res.status(400).send('User does not exist');
    }

    const user = doc.data();
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: '1h'
    });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// SignOut Route (For JWT, signing out is usually handled client-side by removing the token)
router.post('/signout', (req, res) => {
  // Inform the client to clear the JWT token
  res.status(200).send('Sign-out successful. Please clear your token.');
});

module.exports = router;
