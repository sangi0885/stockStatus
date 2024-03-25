const admin = require('firebase-admin');
const InternalError = require('../errorHandlers/InternalError');
const { isPaintToBeUpdated, isPaintToBeAdded } = require('../utils/validators');
const db = admin.firestore();

class PaintService {
  constructor() {
    this.paintInventoryCollection = db.collection('paints');
    this.paintOrderCollection = db.collection('paintOrders');
    this.userCollection = db.collection('users');
  }

  async getAllPaintInventory() {
    const snapshot = await this.paintInventoryCollection.get();
    const paintInventory = [];
    snapshot.forEach(doc => {
      paintInventory.push({ id: doc.id, ...doc.data() });
    });
    return paintInventory;
  }

  async addPaintInventory(req, res) {
    const params = req.body;

    const isValidatePaintInfo = isPaintToBeAdded(params);

    if (isValidatePaintInfo.length > 0) {
      throw new InternalError(200, isValidatePaintInfo);
    }

    try {
      const { name, quantity } = params;
      const newOrderRef = await this.paintInventoryCollection.add({
        name,
        quantity
      });

      return newOrderRef.id;
    } catch (error) {
      throw new InternalError(500, 'Internal server error', error);
    }
  }

  async getAllPaintOrders() {
    const snapshot = await this.paintOrderCollection.get();
    const paintOrders = [];
    snapshot.forEach(doc => {
      paintOrders.push({ id: doc.id, ...doc.data() });
    });
    return paintOrders;
  }

  async createPaintOrder(orderDetails) {
    try {
      const { orderedBy, color, quantity, orderDate, receivedDate, status } =
        orderDetails;
      const newOrderRef = await this.paintOrderCollection.add({
        orderedBy,
        color,
        quantity,
        orderDate,
        receivedDate,
        status
      });
      return newOrderRef.id;
    } catch (error) {
      console.error('Error creating paint order:', error);
      throw new InternalError(500, 'Internal server error', error);
    }
  }

  async updatePaintInventory(paintId, updatedInventory) {
    const isValidInfo = isPaintToBeUpdated(updatedInventory);
    if (isValidInfo.length > 0) {
      throw new InternalError(404, isValidInfo);
    }
    try {
      await this.paintInventoryCollection.doc(paintId).update(updatedInventory);
    } catch (error) {
      console.error('Error updating paint inventory:', error);
      throw new InternalError(500, 'Internal server error', error);
    }
  }
}

module.exports = PaintService;
