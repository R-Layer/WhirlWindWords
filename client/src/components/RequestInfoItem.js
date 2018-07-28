import React, { Component } from "react";

import moment from "moment";

class RequestInfoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  toggleState = () => {
    this.setState({
      active: !this.state.active
    });
  };

  formatDate = dateToFormat =>
    moment(dateToFormat).format("Do MMMM YYYY HH:mm:ss");

  render() {
    const { request } = this.props;
    return (
      <div className="CST_request-info-item">
        <div
          className="title is-7 CST_request-title"
          onClick={this.toggleState}
        >
          {request.bookIn.title.toUpperCase()}
        </div>
        {this.state.active && (
          <div>
            {" "}
            <div className="CST_request-info-label">
              {request.active ? "You would give:" : "You gave"}
            </div>
            <div className="CST_request-info-data">{request.bookOut.title}</div>
            <div className="CST_request-info-label">
              {request.active ? "You would have:" : "You had back"}
            </div>
            <div className="CST_request-info-data">{request.bookIn.title}</div>
            <div className="CST_request-info-label">Request submitted on </div>
            <div className="CST_request-info-data">
              {this.formatDate(request.createdAt)}
            </div>
            {!request.active && (
              <div>
                {" "}
                <div className="CST_request-info-label">
                  Request accepted on{" "}
                </div>
                <div className="CST_request-info-data">
                  {this.formatDate(request.updatedAt)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default RequestInfoItem;
