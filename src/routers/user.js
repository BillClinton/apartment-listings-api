/**
 * Express router providing user related routes
 */
const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

/**
 * @api {post} /users/login Login
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {JSON} body Email and password combination.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "nfoles9@gmail.com",
 *       "password": "eagles4133"
 *     }
 *
 * @apiSuccess {Object} user User profile information
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "Nick",
 *       "surname": "Foles",
 *       "email": "nfoles9@gmail.com",
 *     }
 *
 * @apiError (Error 4xx) 400 Bad Request
 *
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
    res.status(400).send();
  }
});

/**
 * Route that logs out current user.
 * @name POST users/logout
 * @member
 * @instance
 * @method
 */
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(400).send();
  }
});

/**
 * Route that logs out current user and destroys all user sessions.
 * @name POST users/logoutAll
 * @member
 * @instance
 * @method
 */
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(400).send();
  }
});

/**
 * Route that accepts and creates a user.
 * @name POST /users
 * @member
 * @instance
 * @method
 * @param {Object} user - JSON Object representing new user to be created
 */
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

/**
 * @api {get} /users Request All Users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {Object[]} users An Array of user objects
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "name": "John",
 *       "surname": "Doe",
 *       "email": "johndoe@email.com"
 *     },{
 *       "name": "Elizabeth",
 *       "surname": "Doe",
 *       "email": "edoe@email.com"
 *     }]
 *
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Error Message"
 *     }
 */
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * @api {get} /user/me Request Current User
 * @apiName GetProfile
 * @apiGroup User
 *
 * @apiSuccess {Object} user User profile information
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John",
 *       "surname": "Doe",
 *       "email": "johndoe@email.com"
 *     }
 *
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Error Message"
 *     }
 */
router.get('/users/me', auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

/**
 * @api {patch} /users/:id Update User
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiParam {String} id Users unique ID.
 * @apiParam {JSON} body Updates to be applied to user.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name": "Marco"
 *     }
 *
 * @apiSuccess {Object} user User profile information
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John",
 *       "surname": "Doe",
 *       "email": "johndoe@email.com"
 *     }
 *
 * @apiError (Error 4xx) 400 Invalid Updates Attempted
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Invalid updates attempted."
 *     }
 */
router.patch('/users/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'surname', 'email', 'password'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates attempted.' });
  }

  try {
    const user = await User.findById(req.params.id);

    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

/**
 * Route that deletes a user.
 * @name DELETE users/:id
 * @member
 * @instance
 * @method
 * @param {string} id - The user id.
 */
router.delete('/users/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    user.remove();
    res.send(user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

module.exports = router;
