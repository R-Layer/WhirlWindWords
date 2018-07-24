import React, { Component } from "react";
import PropTypes from "prop-types";

class BookInsertion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      exchangeable: false
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onCheck = e => {
    this.setState({
      exchangeable: e.target.checked
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.addBook(this.state);
  };

  render() {
    const { errors } = this.props;
    let spreadErr = {};
    if (errors.isJoi) {
      errors.details.map(err => {
        return spreadErr.hasOwnProperty(err.context.key)
          ? spreadErr[err.context.key].push(err.message.replace(/"/g, ""))
          : (spreadErr[err.context.key] = [err.message.replace(/"/g, "")]);
      });
    }

    return (
      <form className="section" onSubmit={this.onSubmit} noValidate>
        <label className="label">Share a book</label>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="The fifth day"
              name="title"
              value={this.state.book}
              onChange={this.onChange}
            />
          </div>
          <div className="control">
            <button type="submit" className="button is-success">
              add
            </button>
          </div>
        </div>
        {spreadErr.title &&
          spreadErr.title.map(err => (
            <p className="help has-text-centered is-danger" key={err}>
              {err}
            </p>
          ))}
        <div>
          <input
            type="checkbox"
            id="shared"
            value="shared"
            onChange={this.onCheck}
          />
          <label htmlFor="shared"> exchangeable</label>
        </div>
      </form>
    );
  }
}

BookInsertion.propTypes = {
  addBook: PropTypes.func.isRequired
};

export default BookInsertion;
