import React from "react";

import moment from "moment";

export default props => {
  const { book } = props;
  const storeDate = moment(book.createdAt).format("Do MMMM YYYY HH:mm:ss");
  return (
    <div
      className={`CST_flex-list-item ${
        book.bookStatus.exchangeable ? "CST_shared" : ""
      } ${book._id ? "" : "CST_placeholder"}`}
    >
      <p className="CST_book-title">{book.title}</p>
      <p className="CST_book-metadata">
        {book._id && (
          <small>
            Inserted by <strong>{book.owner.name}</strong> on {storeDate}
          </small>
        )}
      </p>
    </div>
  );
};
