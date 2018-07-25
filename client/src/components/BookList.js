import React, { Component } from "react";

import BookListItem from "./BookListItem";

class BookList extends Component {
  render() {
    return (
      <div className="CST_flex-list">
        {this.props.books.map(book => (
          <BookListItem key={book._id} book={book} />
        ))}
      </div>
    );
  }
}

export default BookList;
