'use strict'

const { validationResult } = require('express-validator/check');
const sanitizeHtml = require('sanitize-html');
const htmlToText = require('html-to-text');
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

        const count = await Page.countDocuments({ book });
        const cleanContent = sanitizeHtml(content);

        const newPage = new Page({
            book,
            content: cleanContent,
            prevPage: count,
            nextPage: count + 2,
            page: count + 1
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

const get = async (req, res) => {

    try {
        const { book, page } = req.params;
        const { format } = req.query;
        const findBook = await Book.findOne({ code: book });
        if (!findBook) return res.status(404).send({ msg: 'Book not found' });
        const findPage = await Page.findOne({ page });
        if (!findPage) return res.status(404).send({ msg: 'Page not found' });

        if (format === 'text') {
            findPage.set('content', htmlToText.fromString(findPage.get('content')));
        }
        res.status(200).send({ page: findPage });

    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

const list = async (req, res) => {

    try {
        const { book } = req.params;
        const { format } = req.query;
        const findBook = await Book.findOne({ code: book });
        if (!findBook) return res.status(404).send({ msg: 'Book not found' });
        const pages = await Page.find({ book });

        if (format === 'text') {
            pages.forEach(page => page.set('content', htmlToText.fromString(page.get('content'))))
        }
        res.status(200).send({ pages, all: pages.length });

    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

module.exports = {
    create,
    list,
    get
}