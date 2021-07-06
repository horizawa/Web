const router = require("express").Router();
const Book = require("../models/book");

// View all books
router.get("/", async (req, res) => {
  const books = await Book.find({});
  try {
    res.json(books);
  } catch (e) {
    res.status(400).json("Error " + e);
  }
});

module.exports = router;
