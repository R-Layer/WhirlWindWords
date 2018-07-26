import React from "react";

import PropTypes from "prop-types";

const RequestPane = props => {
  const requests = props.requestArray.map(request => (
    <div key={request._id}>
      <div>{request.active ? "You offer:" : "You gave"}</div>
      <div>{request.bookOut.title}</div>
      <div>{request.active ? "You would like to have:" : "You had"}</div>
      <div>{request.bookIn.title}</div>
      <div>{`Request submitted on ${request.createdAt}`}</div>
      <div>{`Request accepted on ${request.updatedAt}`}</div>
      <hr />
    </div>
  ));
  return <div>{requests}</div>;
};

RequestPane.propTypes = {
  requestArray: PropTypes.array.isRequired
};

export default RequestPane;
