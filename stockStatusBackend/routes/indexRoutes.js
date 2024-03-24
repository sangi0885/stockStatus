const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const db = admin.firestore();

const router = express.Router();

const PaintService = require('../services/paintService');

const paintService = new PaintService();

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

// Route to get all paint inventory
router.get('/inventory', async (req, res) => {
  try {
    const paintInventory = await paintService.getAllPaintInventory();
    res.json(paintInventory);
  } catch (error) {
    console.error('Error getting paint inventory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all paint orders
router.get('/orders', async (req, res) => {
  try {
    const paintOrders = await paintService.getAllPaintOrders();
    res.json(paintOrders);
  } catch (error) {
    console.error('Error getting paint orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new paint order
router.post('/orders', async (req, res) => {
  try {
    const { orderedBy, color, quantity, orderDate, receivedDate, status } =
      req.body;
    const orderId = await paintService.createPaintOrder({
      orderedBy,
      color,
      quantity,
      orderDate,
      receivedDate,
      status
    });
    res.status(201).json({ orderId });
  } catch (error) {
    console.error('Error creating paint order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update paint inventory
router.put('/inventory/:paintId', async (req, res) => {
  try {
    const paintId = req.params.paintId;
    const updatedInventory = req.body;
    await paintService.updatePaintInventory(paintId, updatedInventory);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating paint inventory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
