import React, { Component } from "react";
import PropTypes from "prop-types";

class BookRemover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.removeBook(this.state);
  };

  render() {
    return (
      <form className="section" onSubmit={this.onSubmit} noValidate>
        <label className="label">Remove a book</label>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select
                name="title"
                onChange={this.onChange}
                defaultValue="Drop a book"
              >
                <option value="" hidden>
                  Drop a book
                </option>
                {this.props.ownBooks.map(book => (
                  <option key={book._id}>{book.title}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-danger">
              remove
            </button>
          </div>
        </div>
      </form>
    );
  }
}

BookRemover.propTypes = {
  removeBook: PropTypes.func.isRequired
};

export default BookRemover;
