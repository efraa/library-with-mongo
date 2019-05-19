'use strict'

const { validationResult } = require('express-validator/check');
const Book = require('../models/book');
const Page = require('../models/page');

const create = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send(errors.array());
    try {
        const { name, desc, isbn, publisher, publicDate, language } = req.body;
        const newBook = new Book({
            name,
            desc,
            isbn,
            publisher,
            publicDate,
            language
        });

        newBook.code = `${newBook._id.toString().slice(18)}`;

        const book = await newBook.save();
        res.status(201).send({ book });
        
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

const get = async (req, res) => {
    try {
      const book = await Book.findOne({ code: req.params.code });
      const paperback = await Page.count({ book: book._id });
      if (!book) return res.status(404).send({ msg: 'Book not found' });

      res.status(200).send({ book, paperback });

    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

const list = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({ books, all: books.length });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

const remove = async (req, res) => {
    try {
        const book = await Book.findOne({ code: req.params.code });
        if (!book) return res.status(404).send({ msg: 'Book not found' });
        await book.remove();
        return res.status(200).send({ msg: 'the book has been removed' });

    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

module.exports = {
    create,
    get,
    list,
    remove
}