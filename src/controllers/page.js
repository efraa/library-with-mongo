'use strict'

const { validationResult } = require('express-validator/check');
const sanitizeHtml = require('sanitize-html');
const Book = require('../models/book');
const Page = require('../models/page');

const create = async (req, res) => { 
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send(errors.array());
    try {
        const { content } = req.body;
        const { book } = req.params;
        const findBook = await Book.findOne({ code: book });
        if (!findBook) return res.status(404).send({ msg: 'Book not found' });

        const count = await Page.count({ book });
        const cleanContent = sanitizeHtml(content);

        const newPage = new Page({
            book,
            content: cleanContent,
            prevPage: count,
            nextPage: count + 1
        });
        const page = await newPage.save();
        const bookUpdate = await Book.findOneAndUpdate({ code: book },
        { paperback: count + 1 }, { new: true });
        if (!bookUpdate) res.status(404).send({ msg: 'The book has not been updated' });
        res.status(201).send({ page });
        
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

module.exports = {
    create
}