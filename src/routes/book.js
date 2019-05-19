'use strict'

const BookController = require('../controllers/book');
const { check } = require('express-validator/check');
const express = require('express');
const api = express.Router();

// @Desc    Create book
// @Access  Private.
api.post('/', [
    check('name', 'please enter a name with 3 or more characters')
    .isLength({
        min: 3
    })
    .trim()
    .escape(),
    check('isbn', 'please enter a valid ISBN this must have 12 or more characters')
    .isLength({
        min: 12
    })
    .trim()
    .escape()
], BookController.create);

// @Desc     Get all books
// @Access   Public
api.get('/', BookController.list);

// @Desc     DELETE book by CODE
// @Access   Private
api.delete('/:code', BookController.remove);

// @Desc     Get Book by CODE
// @Access   Public
api.get('/:code', BookController.get);

// @Desc     Update book by CODE
// @Access   Private
api.put('/:code', BookController.update);

module.exports = api;