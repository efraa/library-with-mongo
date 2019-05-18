'use strict'

const BookController = require('../controllers/book');
const express = require('express');
const api = express.Router();

// @Desc    Create book
// @Access  Private.
api.post('/book', BookController.create);

module.exports = api;