const express = require('express');
const cors = require('cors');
require('./db/mongoose.js');

const userRouter = require('./routers/user');
const apartmentRouter = require('./routers/apartment');

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(apartmentRouter);

// respond with 404 if root is requested
app.get('/', function (req, res) {
  res.send(404);
});

module.exports = app;
