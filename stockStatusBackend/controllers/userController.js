const InternalError = require('../errorHandlers/InternalError');
const userService = require('../services/userService');
const isNullOrUndefined = require('../utils/nullOrUndefined');

async function getUserByUserName(req, res) {
  try {
    const params = req.body;

    if (isNullOrUndefined(params.username) || params.username === '') {
      const error = new InternalError(400, 'Username is required');
      return res.status(error.statusCode).json({ message: error.message });
    }
    const user = await userService.getUserByUsername(params.username);
    console.log('user:', user);
    return res.status(200).json(user); // Convert user object to JSON
  } catch (error) {
    console.log('error while getting user controller:', error);
    return res.status(500).json({ message: error.message });
  }
}

async function getAllUsersList(req, res) {
  try {
    const user = await userService.getAllUsersList();
    console.log('user:', user);
    return res.status(200).json(user); // Convert user object to JSON
  } catch (error) {
    console.log('error while getting user controller:', error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { getUserByUserName, getAllUsersList };
