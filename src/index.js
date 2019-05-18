'use strict'

const app = require('./app');
const { port }= require('./config');
const connectDB = require('./config/db');

// Connect Database
connectDB();

// Lauch Server
app.listen(port, () => console.log(`Server running on port ${port}`));