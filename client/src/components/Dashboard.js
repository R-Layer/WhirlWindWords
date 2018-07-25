import React, { Component } from "react";

import Navbar from "./Navbar";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getBooksAction } from "../redux/actions/bookActions";
import {
  selectExtAction,
  selectOwnAction,
  clearAction
} from "../redux/actions/requestActions";
import { logoutAction } from "../redux/actions/userActions";

import BookList from "./BookList";
import RequestPanel from "./RequestPanel";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownBooks: [],
      anybodyBooks: []
    };
  }

  componentDidMount() {
    this.props.getBooks().then(booksStore => {
      let ownArr = [];
      let extArr = [];
      booksStore.books.forEach(book => {
        if (book.owner._id === this.props.auth.user.id) {
          ownArr.push(book);
        } else {
          extArr.push(book);
        }
      });
      this.setState({
        ownBooks: ownArr,
        anybodyBooks: extArr
      });
    });
  }

  selectItem = e => {
    const { books, requests, selectExt, selectOwn, clear } = this.props;
    let selectedBook = e.target.closest(".CST_flex-list-item").id;
    for (let book of books) {
      if (book._id.toString() === selectedBook) {
        switch (true) {
          case selectedBook === requests.own._id:
            return clear("own");
          case selectedBook === requests.ext._id:
            return clear("ext");
          case Object.keys(requests.ext).length > 0:
            return selectOwn(book);
          case Object.keys(requests.ext).length === 0:
            return selectExt(book);
          default:
            return;
        }
      }
    }
  };

  render() {
    const { auth, requests, logout } = this.props;
    const { ownBooks, anybodyBooks } = this.state;
    return (
      <div>
        <Navbar isAuthenticated={auth.isAuthenticated} logout={logout} />
        <div className="CST_main-grid ">
          <div className="CST_list">
            <BookList
              books={requests.ext._id ? ownBooks : anybodyBooks}
              selectItem={this.selectItem}
            />
          </div>
          <div className="CST_request">
            <RequestPanel requests={requests} selectItem={this.selectItem} />
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
  getBooks: PropTypes.func.isRequired,
  selectExt: PropTypes.func.isRequired,
  selectOwn: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.authState,
  errors: state.errors,
  books: state.bookState,
  requests: state.requestState
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
  getBooks: () => dispatch(getBooksAction()),
  selectExt: book => dispatch(selectExtAction(book)),
  selectOwn: book => dispatch(selectOwnAction(book)),
  clear: bookToClear => dispatch(clearAction(bookToClear))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
