const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  pageCount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  coverImage: {
    type: Buffer,
    required: true
  },
  coverImageType: {
    type: String,
    required: true
  },
  unread: {
    type: Boolean,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author"
  }
});

module.exports = mongoose.model("Book", bookSchema);
