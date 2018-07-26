import React, { Component } from "react";

import PropTypes from "prop-types";

import RequestPane from "./RequestPane";

class Requests extends Component {
  render() {
    const { requests, user } = this.props;
    const requestsDone = requests.filter(
      request => request.active && request.bookOut.owner === user.id
    );
    const requestsReceived = requests.filter(
      request => request.active && request.bookIn.owner === user.id
    );
    const requestsSettled = requests.filter(request => !request.active);
    return (
      <div className="CST_bordered">
        <h3 className="title is-3">Requests</h3>
        <div className="columns CST_is-distributed">
          <div className="column is-4 CST_bordered ">
            <h6 className="title is-6">Pending requests - submitted</h6>
            <RequestPane requestArray={requestsDone} />
          </div>
          <div className="column is-4 CST_bordered ">
            <h6 className="title is-6">Pending requests - received</h6>
            <RequestPane requestArray={requestsReceived} />
          </div>
          <div className="column is-4 CST_bordered ">
            <h6 className="title is-6">Settled exchange</h6>
            <RequestPane requestArray={requestsSettled} />
          </div>
        </div>
      </div>
    );
  }
}

Requests.propTypes = {
  requests: PropTypes.array.isRequired
};

export default Requests;
