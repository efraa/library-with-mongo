'use strict'

const PageController = require('../controllers/page');
const express = require('express');
const api = express.Router();

// @Desc    Create page
// @Access  Private.
api.post('/page', PageController.create);

module.exports = api;