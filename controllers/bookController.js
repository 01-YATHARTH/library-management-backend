const Book = require("../models/Book");

exports.addBook = async (req, res) => {
  try {

    const book = new Book(req.body);
    await book.save();

    res.status(201).json(book);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


exports.getBooks = async (req, res) => {
  try {

    const books = await Book.find();

    res.status(200).json(books);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


exports.getBookById = async (req, res) => {
  try {

    const book = await Book.findById(req.params.id);

    if (!book)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


exports.updateBook = async (req, res) => {
  try {

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(book);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


exports.deleteBook = async (req, res) => {
  try {

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Book deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


exports.searchBook = async (req, res) => {
  try {

    const title = req.query.title;

    const books = await Book.find({
      title: { $regex: title, $options: "i" }
    });

    res.status(200).json(books);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};