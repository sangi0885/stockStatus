class UserModel {
  constructor(id, name, role, email, isActive, password) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.email = email;
    this.isActive = isActive;
  }

  getUserName() {
    return this.name;
  }
  getUserRole() {
    return this.role;
  }
  getUserEmail() {
    return this.email;
  }
  getUserDetails = () => {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      email: this.email,
      isActive: this.isActive
    };
  };
}

module.exports = UserModel;
