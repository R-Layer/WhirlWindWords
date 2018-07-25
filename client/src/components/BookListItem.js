import React from "react";

import moment from "moment";

export default props => {
  const storeDate = moment(props.book.createdAt).format(
    "Do MMMM YYYY HH:mm:ss"
  );
  return (
    <div
      className={`CST_flex-list-item ${
        props.book.bookStatus.exchangeable ? "shared" : ""
      }`}
    >
      <p className="CST_book-title">{props.book.title}</p>
      <p className="CST_book-metadata">
        <small>
          Inserted by <strong>{props.book.owner.name}</strong> on {storeDate}
        </small>
      </p>
    </div>
  );
};
