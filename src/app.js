'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const { prefixRoutes } = require('./config');
const app = express();

// Init Middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// Get routes
const book = require('./routes/book');
const page = require('./routes/page');

// Define Routes
app.use(prefixRoutes, book);
app.use(prefixRoutes, page);

module.exports = app;