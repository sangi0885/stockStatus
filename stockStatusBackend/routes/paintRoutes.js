const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const PaintService = require('../services/paintService');

const paintService = new PaintService();

// Route to add paint inventory

router.post('/add', async (req, res) => {
  try {
    const data = await paintService.addPaintInventory(req, res);
    res.status(200).json({ msg: 'Paint added successfully', data });
  } catch (error) {
    console.error('Error adding paint inventory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
