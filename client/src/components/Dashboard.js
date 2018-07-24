import React, { Component } from "react";

import Navbar from "./Navbar";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getBooksAction,
  insertBookAction,
  removeBookAction
} from "../redux/actions/bookActions";
import { logoutAction } from "../redux/actions/userActions";

import BookInsertion from "./forms/BookInsertion";
import BookRemover from "./forms/BookRemover";
import BookList from "./BookList";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  addBook = bookInfo => {
    this.props.insertBook(bookInfo).then(() => this.props.getBooks());
  };

  removeBook = bookTitle => {
    this.props.removeBook(bookTitle).then(() => this.props.getBooks());
  };

  render() {
    const { auth, books, errors, logout } = this.props;
    const ownBooks = books.filter(book => book.owner._id === auth.user.id);

    return (
      <div>
        <Navbar isAuthenticated={auth.isAuthenticated} logout={logout} />
        <div className="CST_main-grid ">
          <div className="CST_add">
            <BookInsertion addBook={this.addBook} errors={errors} />
          </div>
          <div className="CST_remove">
            <BookRemover removeBook={this.removeBook} ownBooks={ownBooks} />
          </div>
          <div className="CST_list">
            <BookList books={books} />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  getBooks: PropTypes.func.isRequired,
  insertBook: PropTypes.func.isRequired,
  removeBook: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.authState,
  errors: state.errors,
  books: state.bookState
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
  getBooks: () => dispatch(getBooksAction()),
  insertBook: bookTitle => dispatch(insertBookAction(bookTitle)),
  removeBook: bookTitle => dispatch(removeBookAction(bookTitle))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
