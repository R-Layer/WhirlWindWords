import React, { Component } from "react";

import PropTypes from "prop-types";

import RequestPane from "./RequestPane";

class Requests extends Component {
  render() {
    return (
      <div className="CST_bordered">
        <h3 className="title is-3">Requests</h3>
        <div className="columns CST_is-distributed">
          <div className="column is-4 CST_bordered ">
            <RequestPane />
          </div>
          <div className="column is-4 CST_bordered ">
            <RequestPane />
          </div>
          <div className="column is-4 CST_bordered ">
            <RequestPane />
          </div>
        </div>
      </div>
    );
  }
}

Requests.propTypes = {
  books: PropTypes.array.isRequired
};

export default Requests;
