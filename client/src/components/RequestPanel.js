import React, { Component } from "react";

import BookListItem from "./BookListItem";

class RequestPanel extends Component {
  render() {
    let state = undefined;
    const bookToGive = state || {
      createdAt: new Date("1970"),
      bookStatus: { exchangeable: false },
      title: "choose a book from the list above",
      owner: { name: "" }
    };
    const bookToAsk = state || {
      createdAt: new Date("1970"),
      bookStatus: { exchangeable: false },
      title: "select a book to give in exchange",
      owner: { name: "" }
    };
    return (
      <div className="columns is-multiline">
        <div className="column is-12">
          <h1 className="has-text-centered">Request panel</h1>
        </div>
        <div className="column is-6">
          <BookListItem book={bookToGive} />
        </div>
        <div className="column is-6">
          <BookListItem book={bookToAsk} />
        </div>
      </div>
    );
  }
}
export default RequestPanel;
