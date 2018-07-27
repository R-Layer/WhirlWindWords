import React, { Component } from "react";

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
            <div>{request.active ? "You offer:" : "You gave"}</div>
            <div>{request.bookOut.title}</div>
            <div>{request.active ? "You would like to have:" : "You had"}</div>
            <div>{request.bookIn.title}</div>
            <div>{`Request submitted on ${request.createdAt}`}</div>
            <div>{`Request accepted on ${request.updatedAt}`}</div>
          </div>
        )}
      </div>
    );
  }
}
export default RequestInfoItem;
