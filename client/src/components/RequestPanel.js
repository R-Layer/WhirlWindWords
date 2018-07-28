import React, { Component } from "react";

import BookListItem from "./BookListItem";

class RequestPanel extends Component {
  render() {
    const { requests } = this.props;
    const bookToGive = {
      createdAt: new Date("1970"),
      bookStatus: { exchangeable: false, applicants: [] },
      _id: "placeholder_1",
      title: "First: choose a book from the list below",
      owner: { name: "" }
    };
    const bookToAsk = {
      createdAt: new Date("1970"),
      bookStatus: { exchangeable: false, applicants: [] },
      title: "Then: select a book to give in exchange",
      _id: "placeholder_2",
      owner: { name: "" }
    };
    return (
      <div className="columns is-multiline">
        <div className="column is-6 CST_panel-window">
          <BookListItem
            book={requests.ext._id ? requests.ext : bookToGive}
            selectItem={this.props.selectItem}
          />
        </div>
        <div className="column is-6 CST_panel-window">
          <BookListItem
            book={requests.own._id ? requests.own : bookToAsk}
            selectItem={this.props.selectItem}
          />
        </div>
        <div className="column is-12 CST_panel-footer">
          <button
            onClick={this.props.submitRequest}
            disabled={requests.own._id && requests.ext._id ? "" : "disabled"}
          >
            Submit request
          </button>
        </div>
      </div>
    );
  }
}
export default RequestPanel;
