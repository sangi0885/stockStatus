const admin = require('firebase-admin');
const db = admin.firestore();

class UserModel {
  constructor(id, name, role, email, isActive) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.email = email;
    this.isActive = isActive;
  }

  static async getUserByEmail(email) {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();
    if (snapshot.empty) {
      console.log('No matching user.');
      return null;
    }

    let userData = {};
    snapshot.forEach(doc => {
      userData = { id: doc.id, ...doc.data() };
    });
    return new UserModel(
      userData.id,
      userData.name,
      userData.role,
      userData.email,
      userData.isActive
    );
  }

  // Additional methods like addUser, updateUser, deleteUser can be implemented here.
}
