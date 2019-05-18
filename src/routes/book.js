'use strict'

const BookController = require('../controllers/book');
const { check } = require('express-validator/check');
const express = require('express');
const api = express.Router();

// @Desc    Create book
// @Access  Private.
api.post('/book', [
    check('name', 'please enter a name with 3 or more characters')
    .isLength({
        min: 3
    }),
    check('isbn', 'please enter a valid ISBN this must have 12 or more characters')
    .isLength({
        min: 12
    }),
], BookController.create);

module.exports = api;