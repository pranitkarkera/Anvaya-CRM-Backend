const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.mongodb_uri;


let cachedConnection = null;

const initializeDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });

    cachedConnection = connection;
    console.log("Connected to database");
    return connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

// Close connection on process termination
process.on("SIGINT", async () => {
  if (cachedConnection) {
    await mongoose.disconnect();
    console.log("Database connection closed");
  }
  process.exit(0);
});

module.exports = { initializeDatabase };
