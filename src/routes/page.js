'use strict'

const PageController = require('../controllers/page');
const { check } = require('express-validator/check');
const express = require('express');
const api = express.Router();

// @Desc    Create page
// @Access  Private.
api.post('/pages/:book', [
    check('content', 'please enter a content with 3 or more characters')
    .isLength({
        min: 3
    })
    .trim()
    .escape()
], PageController.create);

module.exports = api;