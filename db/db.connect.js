const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URL = process.env.mongodb_uri;

const initializeDatabase = async () => {
  await mongoose
    .connect(MONGODB_URL)
    .then(() => console.log('Connected to database'))
    .catch((error) => console.log('Error connecting to database', error));
};

module.exports = { initializeDatabase };
