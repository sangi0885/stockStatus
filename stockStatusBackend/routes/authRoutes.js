const express = require('express');
const isNullOrUndefined = require('../utils/nullOrUndefined');

const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

const UserService = require('../services/userService');

const userService = new UserService();

// SignIn Route
router.post('/signin', async (req, res) => {
  try {
    await userService.loginUser(req, res);
  } catch (error) {
    console.error('Error signin:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//*
router.get('/getactiveusers', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const userList = users.reduce((acc, user) => {
      if (user.username && user.isActive)
        acc.push({
          username: user.username
        });
      return acc;
    }, []);
    console.log('userList:', userList);
    res.status(200).json({ msg: 'success', userList });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getusers', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const userList = users.reduce((acc, user) => {
      if (user.username && user.isActive)
        acc.push({
          username: user.username,
          email: user.email,
          role: user.role
        });
      return acc;
    }, []);
    console.log('userList:', userList);
    res.status(200).json({ msg: 'success', userList });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

module.exports = router;
