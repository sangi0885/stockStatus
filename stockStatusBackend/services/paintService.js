const admin = require('firebase-admin');
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

  async getAllPaintOrders() {
    const snapshot = await this.paintOrderCollection.get();
    const paintOrders = [];
    snapshot.forEach(doc => {
      paintOrders.push({ id: doc.id, ...doc.data() });
    });
    return paintOrders;
  }

  async getUserByEmail(email) {
    const querySnapshot = await this.userCollection
      .where('email', '==', email)
      .get();
    if (querySnapshot.empty) {
      return null;
    }
    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
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
      throw error;
    }
  }

  async updatePaintInventory(paintId, updatedInventory) {
    try {
      await this.paintInventoryCollection.doc(paintId).update(updatedInventory);
    } catch (error) {
      console.error('Error updating paint inventory:', error);
      throw error;
    }
  }
}

module.exports = PaintService;
