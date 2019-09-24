const express = require('express');
const router = new express.Router();
const User = require('../models/user');

/**
 * Login
 */
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    //res.status(400).send();
    res.status(400).send({ error: e.message });
  }
});

/**
 * Create user
 */
// router.post('/users', async (req, res) => {
//   const user = new User(req.body);

//   try {
//     await user.save();

//     res.status(201).send({ user });
//   } catch (e) {
//     res.status(400).send({ error: e.message });
//   }
// });

/**
 * Create user and login
 */
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

module.exports = router;
