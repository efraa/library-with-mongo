'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = Schema({
  book: String,
  nextPage: Number,
  prevPage: Number,
  page: Number,
  content: {
    type: String,
    required: true
  },
  registered: {
    type: Date,
    default: Date.now
  }
},
{
  toJSON: {
    transform: (doc, page) => {
      delete page.__v;
      delete page._id;
      delete page.book;
    }
  }
});

module.exports = mongoose.model('Page', PageSchema);