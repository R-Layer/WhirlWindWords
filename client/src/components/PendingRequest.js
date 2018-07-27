import React from "react";

import PropTypes from "prop-types";

const PendingRequest = props => {
  const { request } = props;
  return (
    <div className="notification is-warning has-text-centered">
      <div className="subtitle">
        {" "}
        {`${request.bookIn.owner.name} propose the following exchange:`}
      </div>
      <div className="content">
        <div className="columns">
          <div className="column is-6 ">
            <span className="CST_notification-label">
              {request.bookIn.owner.name} OFFERS:
            </span>
            <br />
            {request.bookOut.title}
          </div>
          <div className="column is-6">
            <span className="CST_notification-label">
              {request.bookIn.owner.name} ASKS:
            </span>
            <br />
            {request.bookIn.title}
          </div>
        </div>
        <div className="CST_notification-footer">
          <span className="button is-success" onClick={props.accept}>
            Accept
          </span>
          <span className="button is-danger" onClick={props.decline}>
            Decline
          </span>
        </div>
      </div>
    </div>
  );
};

PendingRequest.propTypes = {
  request: PropTypes.object.isRequired,
  accept: PropTypes.func.isRequired,
  decline: PropTypes.func.isRequired
};

export default PendingRequest;
