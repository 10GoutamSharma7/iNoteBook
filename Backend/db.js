const mongoose = require('mongoose');

const MongoUrl = "mongodb://localhost:27017/Mynotebook_backend";

const connectToMongo = async () => {
  try {
    await mongoose.connect(MongoUrl);
    console.log("Connected to MongoDB successfully");
  } 
  catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;

