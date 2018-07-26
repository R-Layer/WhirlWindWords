import React, { Component } from "react";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import { logoutAction } from "../redux/actions/userActions";
import {
  getBooksAction,
  insertBookAction,
  removeBookAction
} from "../redux/actions/bookActions";

import {
  getRequestsAction,
  updateRequestAction,
  deleteRequestAction
} from "../redux/actions/requestActions";

import BookInsertion from "./forms/BookInsertion";
import BookRemover from "./forms/BookRemover";
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

  removeBook = bookTitle => {
    this.props.removeBook(bookTitle).then(() => this.props.getBooks());
  };

  acceptRequest = id => {
    this.props.acceptRequest(id);
  };

  rejectRequest = id => {
    this.props.rejectRequest(id);
  };
  render() {
    console.log("requests", this.props.requests);
    const { auth, books, errors, logout } = this.props;
    const ownBooks = books.filter(book => book.owner._id === auth.user.id);
    return (
      <div>
        <Navbar isAuthenticated={auth.isAuthenticated} logout={logout} />
        <h1 className="title">Library</h1>
        <ul>
          {this.props.requests.map(request => (
            <li key={request._id}>
              {request.bookIn.title} - {request.bookOut.title} -{" "}
              <button onClick={() => this.acceptRequest(request._id)}>
                Accept
              </button>{" "}
              <button onClick={() => this.rejectRequest(request._id)}>
                Reject
              </button>
            </li>
          ))}
        </ul>
        <section id="books" className="section">
          <div className="columns">
            <div className="column is-8 CST_add">
              <BookInsertion addBook={this.addBook} errors={errors} />
            </div>
            <div className="column is-4 CST_remove">
              <BookRemover removeBook={this.removeBook} ownBooks={ownBooks} />
            </div>
          </div>
          {ownBooks.map(book => <Book bookInfo={book} key={book._id} />)}
        </section>
        <section id="requests" className="section">
          <Requests books={books} />
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
  removeBook: bookTitle => dispatch(removeBookAction(bookTitle)),
  acceptRequest: reqId => dispatch(updateRequestAction(reqId)),
  rejectRequest: reqId => dispatch(deleteRequestAction(reqId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
