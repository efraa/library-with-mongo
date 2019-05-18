const mongoose = require('mongoose');
const { db } = require('./index');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB Connected...');
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = connectDB;