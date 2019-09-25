/**
 * Apartment model
 */
const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    rent: {
      type: Number,
      required: true
    },
    bedrooms: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    contact: {
      type: String,
      trim: true
    },
    available: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
