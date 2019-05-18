'use strict'

const { validationResult } = require('express-validator/check');
const Book = require('../models/book');

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

        newBook.code = `${name, newBook._id.toString().slice(18)}`;

        const book = await newBook.save();
        res.status(201).send({ book });
        
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

module.exports = {
    create
}