'use strict'

const PageController = require('../controllers/page');
const { check } = require('express-validator/check');
const express = require('express');
const api = express.Router();

// @Desc    Create page
// @Access  Private.
api.post('/:book/pages', [
    check('content', 'please enter a content with 3 or more characters')
    .isLength({
        min: 3
    })
    .trim()
], PageController.create);

// @Desc     Get all pages from a book
// @Access   Public
api.get('/:book/pages', PageController.list);

// @Desc     Update page
// @Access   Public
api.put('/:book/pages/:page', PageController.update);

// @Desc     Get page
// @Access   Public
api.get('/:book/pages/:page', PageController.get);

// @Desc     DELETE page
// @Access   Private
api.delete('/:book/pages/:page', PageController.remove);


module.exports = api;