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

exports.books_change_state = (req, res) => {
  Book.findByIdAndUpdate(req.body.bookId, {
    $push: { "bookStatus.applicants": req.app.locals.userAuth.id }
  })
    .then(requested => res.status(200).json(requested))
    .catch(err => res.status(500).json(err));
};
