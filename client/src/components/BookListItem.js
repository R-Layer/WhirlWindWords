import React from "react";

import moment from "moment";

export default props => {
  const { book, selectItem } = props;
  const storeDate = moment(book.createdAt).format("Do MMMM YYYY HH:mm:ss");

  let status = book.bookStatus.exchangeable ? "shared" : "stored";
  if (book.bookStatus.pending) {
    status = "pending";
  }
  if (book._id === "placeholder_1" || book._id === "placeholder_2") {
    status = "placeholder";
  }

  let backColorClass = "";
  let tag = "";

  switch (status) {
    case "stored":
      backColorClass = "CST_stored";
      tag = "STORED";
      break;
    case "shared":
      backColorClass = "CST_shared";
      tag = "ACTIVE";
      break;
    case "pending":
      backColorClass = "CST_pending";
      tag = "PENDING";
      break;
    case "placeholder":
      backColorClass = "CST_placeholder";
      break;
    default:
      break;
  }

  return (
    <div
      onClick={book.bookStatus.exchangeable ? selectItem : () => {}}
      id={book._id}
      className="CST_flex-list-item"
    >
      <p className="CST_book-title">{book.title}</p>
      {!(status === "placeholder") && (
        <p className={`CST_book-metadata ${backColorClass}`}>
          <span>
            {book._id && (
              <small>
                Inserted by <strong>{book.owner.name}</strong> on {storeDate}
              </small>
            )}
          </span>
          <span>{tag}</span>
        </p>
      )}
    </div>
  );
};
