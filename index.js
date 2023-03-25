const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const alarmtime = require('./routes/route');

var dotenv = require('dotenv');
dotenv.config();
const database = process.env.MONGOLAB_URI;

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(database);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
app.get('/', function (req, res) {
  res.redirect('/');
});
app.use('/api', alarmtime);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log('listening for requests');
  });
});
