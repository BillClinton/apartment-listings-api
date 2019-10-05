const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Apartment = require('../../src/models/apartment');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: 'Test',
  surname: 'User',
  email: 'bc@appunto.net',
  password: 'Node123!!',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.WEB_TOKEN_PASSPHRASE)
    }
  ]
};

const apartmentOneId = new mongoose.Types.ObjectId();

const apartmentOne = {
  _id: apartmentOneId,
  name: '3 bedroom in Fairmount',
  address: '2009 Green St., Philadelphia Pa, 19130',
  rent: 1850,
  bedrooms: 3,
  bathrooms: 1.5,
  contact: '215-123-4567',
  available: 'December'
};

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();

  await Apartment.deleteMany();
  await new Apartment(apartmentOne).save();
};

module.exports = {
  userOneId,
  userOne,
  apartmentOneId,
  apartmentOne,
  setupDatabase
};
