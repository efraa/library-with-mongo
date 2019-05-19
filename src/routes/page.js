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

// @Desc     Get page by pageID
// @Access   Public
api.get('/:book/pages/:page', PageController.get);


module.exports = api;