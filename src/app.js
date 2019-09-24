const express = require('express');
require('./db/mongoose.js');

const app = express();

app.use(express.json());

module.exports = app;
