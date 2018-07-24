import React, { Component } from "react";

import Book from "./Book";

class BookList extends Component {
  render() {
    return (
      <div className="CST_flex-list">
        {this.props.books.map(book => <Book key={book._id} book={book} />)}
      </div>
    );
  }
}

export default BookList;
