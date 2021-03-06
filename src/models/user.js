/**
 * User model
 */
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    surname: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(val) {
        if (validator.contains(val.toUpperCase(), 'password'.toUpperCase())) {
          throw new Error('Password cannot contain the word "password"');
        }
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error('Email must be a valid email address');
        }
      }
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      type: Buffer
    }
  },
  {
    timestamps: true
  }
);

/**
 * Generates an authentication token.
 * @returns {String} token The jsonwebtoken
 */
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.WEB_TOKEN_PASSPHRASE
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

/**
 * Deletes sensitive data from user before converting to JSON.
 * @returns {Object} user The user JSON object
 */
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

/**
 * Find a user based on email and password.
 * @param {string} email The user's email address
 * @param {string} password The user's password
 * @returns {Object} user The user JSON object
 */
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

// Hash plain text password before saving
userSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
