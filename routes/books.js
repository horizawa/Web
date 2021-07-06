const router = require("express").Router();
const Book = require("../models/book");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

// View all books
router.get("/", async (req, res) => {
  const books = await Book.find({});
  try {
    res.json(books);
  } catch (e) {
    res.status(400).json("Error " + e);
  }
});

// Add book
router.post("/new", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    unread: req.body.unread,
    pageCount: req.body.pageCount,
    description: req.body.description
  });
  saveCover(book, req.body.cover, req.body.coverImageType);

  try {
    await book.save();
    res.json("Book added!");
  } catch (e) {
    console.log(e);
    res.json("Error: Could not add book");
  }
});

// View individual book
router.get("/single/:id", async (req, res) => {
  const book = await Book.findById(req.params.id)
    .populate("author")
    .exec();
  try {
    res.json(book);
  } catch (e) {
    res.status(400).json("Error " + e);
  }
});

// Delete book
router.delete("/:id", async (req, res) => {
  let book;

  try {
    book = await Book.findById(req.params.id);
    await book.remove();
  } catch {
    res.json("Error: Could not delete book");
  }
});

// Update book
router.put("/edit/:id", async (req, res) => {
  let book;

  try {
    book = await Book.findById(req.params.id);
    book.title = req.body.title;
    book.author = req.body.author;
    book.publishDate = req.body.publishDate;
    book.unread = req.body.unread;
    book.pageCount = req.body.pageCount;
    book.description = req.body.description;

    if (req.body.cover != null && req.body.cover !== "") {
      saveCover(book, req.body.cover);
    }

    await book.save();
    res.json("Book updated!");
  } catch {
    res.json("Error: Could not update book");
  }
});

function saveCover(book, coverEncoded, coverType) {
  if (coverEncoded == null) return;
  else if (coverEncoded != null && imageMimeTypes.includes(coverType)) {
    book.coverImage = new Buffer.from(coverEncoded, "base64");
    book.coverImageType = coverType;
  }
}

module.exports = router;
