const mongoose = require("mongoose");
const Book = require("./book");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

authorSchema.pre("remove", function(next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      next(err);
    } else if (books.length > 0) {
      next(new Error("Error: Author still has books"));
    } else {
      next();
    }
  });
});

module.exports = mongoose.model("Author", authorSchema);
