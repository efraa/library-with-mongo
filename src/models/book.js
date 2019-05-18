'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
{
    toJSON: {
        transform: (doc, book) => {
        delete book.__v;
        }
    }
});

module.exports = mongoose.model('Book', BookSchema);