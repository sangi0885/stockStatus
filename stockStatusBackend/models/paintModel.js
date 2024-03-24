const { learlingDB } = require('../config/config');

// Define the collection name
const PAINTS_COLLECTION = 'paints';

// Function to add a paint to the database
const addPaint = async paintData => {
  const paintRef = db.collection(PAINTS_COLLECTION).doc(); // Auto-generated document ID
  await paintRef.set(paintData);
  return paintRef.id; // Return the ID of the newly added paint
};

// Function to update a paint in the database
const updatePaint = async (paintId, paintData) => {
  const paintRef = db.collection(PAINTS_COLLECTION).doc(paintId);
  await paintRef.update(paintData);
};

// Function to delete a paint from the database
const deletePaint = async paintId => {
  await db.collection(PAINTS_COLLECTION).doc(paintId).delete();
};

// Function to get all paints from the database
const getAllPaints = async () => {
  const snapshot = await db.collection(PAINTS_COLLECTION).get();
  const paints = [];
  snapshot.forEach(doc => {
    paints.push({ id: doc.id, ...doc.data() });
  });
  return paints;
};

module.exports = {
  addPaint,
  updatePaint,
  deletePaint,
  getAllPaints
};
