'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book'
  },
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
        transform: (doc, page) => {
        delete page.__v;
        }
    }
});

module.exports = mongoose.model('Page', PageSchema);