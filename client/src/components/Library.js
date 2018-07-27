import React, { Component } from "react";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import { logoutAction } from "../redux/actions/userActions";
import {
  getBooksAction,
  insertBookAction,
  updateBookAction,
  removeBookAction
} from "../redux/actions/bookActions";

import {
  getRequestsAction,
  updateRequestAction,
  deleteRequestAction
} from "../redux/actions/requestActions";

import BookInsertion from "./forms/BookInsertion";
import BookRemover from "./forms/BookRemover";
import PendingRequest from "./PendingRequest";
import Requests from "./Requests";
import Navbar from "./Navbar";
import Book from "./Book";

class Library extends Component {
  componentDidMount() {
    this.props.getBooks();
    this.props.getRequests();
  }

  addBook = bookInfo => {
    this.props.insertBook(bookInfo).then(() => this.props.getBooks());
  };

  updateBook = (bookInfo, bookId) => {
    this.props.updateBook(bookInfo, bookId).then(() => this.props.getBooks());
  };

  removeBook = bookTitle => {
    this.props.removeBook(bookTitle).then(() => this.props.getBooks());
  };

  acceptRequest = id => {
    this.props
      .acceptRequest(id)
      .then(() => this.props.getBooks())
      .then(() => this.props.getRequests());
  };

  rejectRequest = id => {
    this.props.rejectRequest(id);
  };
  render() {
    const { auth, books, requests, errors, logout } = this.props;
    const ownBooks = books.filter(book => book.owner._id === auth.user.id);
    return (
      <div>
        <Navbar isAuthenticated={auth.isAuthenticated} logout={logout} />
        {requests
          .filter(el => el.active && el.bookOut.owner !== auth.user.id)
          .map(request => (
            <PendingRequest
              request={request}
              key={request._id}
              accept={() => this.acceptRequest(request._id)}
              decline={() => this.rejectRequest(request._id)}
            />
          ))}
        <section id="books" className="CST_bordered">
          <h3 className="title is-3 ">Books</h3>
          <div className="columns is-gapless CST_add-remove">
            <div className="column is-8 CST_add">
              <BookInsertion addBook={this.addBook} errors={errors} />
            </div>
            <div className="column is-4 CST_remove">
              <BookRemover removeBook={this.removeBook} ownBooks={ownBooks} />
            </div>
          </div>
          {ownBooks.map(book => (
            <Book
              bookInfo={book}
              key={book._id}
              errors={errors}
              updateBook={this.updateBook}
            />
          ))}
        </section>
        <section id="requests" className="">
          <Requests requests={requests} user={auth.user} />
        </section>
      </div>
    );
  }
}

Library.propTypes = {
  auth: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  insertBook: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  removeBook: PropTypes.func.isRequired,
  getRequests: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.authState,
  books: state.bookState,
  requests: state.requests,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  getBooks: () => dispatch(getBooksAction()),
  getRequests: () => dispatch(getRequestsAction()),
  logout: () => dispatch(logoutAction()),
  insertBook: bookTitle => dispatch(insertBookAction(bookTitle)),
  updateBook: (bookInfo, bookId) =>
    dispatch(updateBookAction(bookInfo, bookId)),
  removeBook: bookTitle => dispatch(removeBookAction(bookTitle)),
  acceptRequest: reqId => dispatch(updateRequestAction(reqId)),
  rejectRequest: reqId => dispatch(deleteRequestAction(reqId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
