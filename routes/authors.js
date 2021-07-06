const router = require("express").Router();
const Author = require("../models/author");
const Book = require("../models/book");

// View all authors
router.get("/all", async (req, res) => {
  const authors = await Author.find({});
  try {
    res.json(authors);
  } catch (e) {
    res.status(400).json("Error " + e);
  }
});

// Add author
router.post("/new", async (req, res) => {
  try {
    const name = await req.body.name;
    const newAuthor = await new Author({ name });
    newAuthor.save();
  } catch {
    res.json("Error: Could not add author");
  }
});

// View individual author
router.get("/single/:id", async (req, res) => {
  const author = await Author.findById(req.params.id);
  const books = await Book.find({ author: author.id })
    .limit(6)
    .exec();
  try {
    res.json({
      author: author,
      books: books
    });
  } catch (e) {
    res.json({
      author: author,
      books: []
    });
  }
});

// Delete author
router.delete("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.remove();
  } catch (e) {
    res.json("Error: Could not delete author");
  }
});

// Update author
router.put("/edit/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    author.name = req.body.name;
    author.save();
  } catch {
    res.json("Error: Could not update author");
  }
});

module.exports = router;
