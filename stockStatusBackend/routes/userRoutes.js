const express = require('express');
const { isNullOrUndefined } = require('util');

const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

router.post('/signin', userController.getUserByUserName);
router.get('/getusers', userController.getAllUsersList);

// SignUp Route
router.post('/signup', async (req, res) => {
  try {
    const token = await userService.signupUser(req, res);
    res.status(200).json({ msg: 'success', token });
  } catch (error) {
    console.error('Error getting paint orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// SignIn Route
router.post('/login', async (req, res) => {
  try {
    const user = await userService.loginUser(req, res);
    res.status(200).json({ msg: 'success', user });
  } catch (error) {
    console.error('Error signin:', error);
    res.status(500).json({ error: 'Internal Server Error', error });
  }
});

//*

router.put('/update', async (req, res) => {
  const params = req.body;
  if (isNullOrUndefined(params)) {
    return res.status(400).send('User data is required to update user');
  }
  try {
    const users = await userService.updateUser(params);
    res.status(200).json({ msg: 'success', users });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// SignOut Route (For JWT, signing out is usually handled client-side by removing the token)
router.post('/signout', verifyToken, (req, res) => {
  // Inform the client to clear the JWT token
  res.status(200).send('Sign-out successful. Please clear your token.');
});

router.get('/', userController.getUserByUserName);

module.exports = router;
