const PaintService = require('../services/paintService');

const paintService = new PaintService();

// Controller to get all paint inventory
async function getAllPaintInventory(req, res) {
  try {
    const paintInventory = await paintService.getAllPaintInventory();
    res.json(paintInventory);
  } catch (error) {
    console.error('Error getting paint inventory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller to get all paint orders
async function getAllPaintOrders(req, res) {
  try {
    const paintOrders = await paintService.getAllPaintOrders();
    res.json(paintOrders);
  } catch (error) {
    console.error('Error getting paint orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller to create a new paint order
async function createPaintOrder(req, res) {
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
}

// Controller to update paint inventory
async function updatePaintInventory(req, res) {
  try {
    const paintId = req.params.paintId;
    const updatedInventory = req.body;
    await paintService.updatePaintInventory(paintId, updatedInventory);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating paint inventory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllPaintInventory,
  getAllPaintOrders,
  createPaintOrder,
  updatePaintInventory
};
