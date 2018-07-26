const Book = require("../models/bookModel");
const Request = require("../models/requestModel");

exports.requests_get_all = (req, res) => {
  Request.find({})
    .populate("bookIn", "title")
    .populate("bookOut", "title")
    .exec()
    .then(requests => res.status(200).json(requests))
    .catch(err => res.status(500).json(err));
};

exports.requests_create_one = (req, res) => {
  Request.find()
    .or([
      { bookIn: req.body.bookIn, bookOut: req.body.bookOut },
      { bookIn: req.body.bookOut, bookOut: req.body.bookIn }
    ])
    .then(request => {
      if (request.length === 0) {
        newRequest = new Request({
          bookIn: req.body.bookIn,
          bookOut: req.body.bookOut
        })
          .save()
          .then(createdRequest => {
            books_change_state(
              createdRequest.bookIn,
              req.app.locals.userAuth.id
            );
            res.status(201).json(createdRequest);
          })
          .catch(err => res.status(500).json(err));
      } else {
        res.status(422).json({ err: { message: "Request already in place!" } });
      }
    });
};

exports.requests_delete_one = (req, res) => {
  Request.findByIdAndRemove(req.body.reqToRemove)
    .exec()
    .then(delReq => {
      if (delReq) {
        res.status(200).json(delReq);
      } else {
        res.status(404).json({ err: { message: "Request not found" } });
      }
    })
    .catch(err => res.status(500).json(err));
};

exports.requests_update_one = (req, res) => {
  Request.findByIdAndUpdate(req.body.reqToAccept, { active: false })
    .exec()
    .then(okReq => {
      if (okReq) {
        res.status(200).json(okReq);
      } else {
        res.status(404).json({ err: { message: "Request not found" } });
      }
    })
    .catch(err => res.status(500).json(err));
};

books_change_state = (bookId, userId) => {
  Book.findByIdAndUpdate(bookId, {
    $push: { "bookStatus.applicants": userId }
  });
};
