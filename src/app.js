'use strict'

const express = require('express');
const bodyParser = require('body-parser');
// const { prefixRoutes } = require('./config');
const app = express();

// Init Middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// Serve the client's folder
// app.use(express.static('../client/build'));

// Get routes
// const routes = require('./routes');

// Define Routes
// app.use(prefixRoutes, routes);

module.exports = app;