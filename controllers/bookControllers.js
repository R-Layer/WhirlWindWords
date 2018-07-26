const Book = require("../models/bookModel");

exports.books_get_all = (req, res) => {
  Book.find({})
    .populate("owner", "name")
    .populate("bookStatus.applicants", "name")
    .exec()
    .then(books => res.status(200).json(books))
    .catch(err => res.status(500).json(err));
};

exports.books_create_one = (req, res) => {
  const user = req.app.locals.userAuth;

  Book.find({ title: req.body.title, owner: user.id })
    .exec()
    .then(book => {
      if (book.length === 0) {
        new Book({
          title: req.body.title,
          owner: user.id,
          bookStatus: {
            exchangeable: req.body.exchangeable
          }
        })
          .save()
          .then(bookCreated =>
            res.status(201).json({
              message: "Book successfully added to your library",
              bookCreated
            })
          )
          .catch(err => res.status(500).json(err));
      } else {
        res.status(422).json({
          err: { message: "You already have this book in your library" }
        });
      }
    })
    .catch(err => res.status(500).json(err));
};

exports.books_remove_one = (req, res) => {
  const user = req.app.locals.userAuth;

  Book.findOneAndRemove({ title: req.body.title, owner: user.id })
    .then(delOp => {
      res.status(200).json(delOp);
    })
    .catch(err => res.status(500).json(err));
};

exports.books_update_one = (req, res) => {
  const user = req.app.locals.userAuth;
  Book.findOneAndUpdate(
    { _id: req.params.bookId, owner: user.id },
    {
      $set: {
        title: req.body.title,
        "bookStatus.exchangeable": req.body.exchangeable
      }
    }
  )
    .then(updBook => {
      if (updBook) {
        res.status(200).json(updBook);
      } else {
        res.status(404).json({ err: { message: "Book not found" } });
      }
    })
    .catch(err => res.status(500).json(err));
};
