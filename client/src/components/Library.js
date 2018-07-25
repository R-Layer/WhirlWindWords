import React, { Component } from "react";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import { logoutAction } from "../redux/actions/userActions";
import { getBooksAction } from "../redux/actions/bookActions";

import Navbar from "./Navbar";
import Book from "./Book";

class Library extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const { auth, books, logout } = this.props;
    const ownBooks = books.filter(book => book.owner._id === auth.user.id);

    return (
      <div>
        <Navbar isAuthenticated={auth.isAuthenticated} logout={logout} />
        <h1 className="title">Library</h1>
        <section className="section">
          {ownBooks.map(book => <Book bookInfo={book} key={book._id} />)}
        </section>
      </div>
    );
  }
}

Library.propTypes = {
  auth: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.authState,
  books: state.bookState,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  getBooks: () => dispatch(getBooksAction()),
  logout: () => dispatch(logoutAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
