/**
 * Express router providing user related routes
 */
const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');

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
 * @api {post} /users/logout Logout
 * @apiname LogoutUser
 * @apigroup User
 *
 * @apisuccess 200 OK
 *
 * @apierror (error 4xx) 400 Bad Request
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
 * @api {post} /users/logoutAll Logout All Sessions
 * @apiname LogoutAllUserSessions
 * @apigroup User
 *
 * @apisuccess 200 OK
 *
 * @apierror (error 4xx) 400 Bad Request
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
 * @api {post} /users Create User
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam {JSON} body User object.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name": "Nick",
 *       "surname": "Foles",
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
 */
router.post('/users', auth, async (req, res) => {
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
 * @apiName GetCurrentProfile
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
 * @api {get} /user/:id Request User
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
 * @apiError (Error 4xx) 404 Not Found
 * @apiError (Error 5xx) 500 Internal Server Error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Error Message"
 *     }
 */
router.get('/users/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
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
 * @api {delete} /users/:id Delete User
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {String} id Users unique ID.
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
 * @apiError (Error 4xx) 400 Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Bad Request."
 *     }
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
