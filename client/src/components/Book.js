import React from "react";

import ModalUpdate from "./forms/ModalUpdate";

import moment from "moment";

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  onEdit = () => {
    this.setState({
      editing: true
    });
  };

  onClose = () => {
    this.setState({
      editing: false
    });
  };

  render() {
    const { bookInfo, errors } = this.props;
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{bookInfo.title}</p>
          <time className="CST_title-date">
            {moment(bookInfo.createdAt).format("Do MMMM YYYY HH:mm:ss")}
          </time>
          <span onClick={this.onEdit} className="CST_title-button">
            edit
          </span>
        </header>
        <div className="card-content">
          <div className="field is-horizontal CST_is-distributed">
            <div className="control">
              <input
                type="checkbox"
                name="stored"
                disabled="disabled"
                checked={bookInfo.bookStatus.exchangeable ? "" : "checked"}
              />
              <label htmlFor="stored"> stored</label>
            </div>
            <div className="control">
              <input
                type="checkbox"
                name="exchangeable"
                disabled="disabled"
                checked={bookInfo.bookStatus.exchangeable ? "checked" : ""}
              />
              <label htmlFor="exchangeable"> exchangeable</label>
            </div>
            <div className="control">
              <input
                type="checkbox"
                name="pending"
                disabled="disabled"
                checked={
                  bookInfo.bookStatus.applicants.length > 0 ? "checked" : ""
                }
              />
              <label htmlFor="pending"> pending</label>
            </div>
            <div className="control">
              <input
                type="checkbox"
                name="exchanged"
                disabled="disabled"
                checked={bookInfo.bookStatus.exchanged ? "checked" : ""}
              />
              <label htmlFor="exchanged"> exchanged</label>
            </div>
          </div>
        </div>
        <ModalUpdate
          book={bookInfo}
          errors={errors}
          updateBook={this.props.updateBook}
          visible={this.state.editing}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

export default Book;
