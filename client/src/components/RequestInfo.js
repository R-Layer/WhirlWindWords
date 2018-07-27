import React from "react";

import PropTypes from "prop-types";

import RequestInfoItem from "./RequestInfoItem";

const RequestInfo = props => {
  const requests = props.requestArray.map(request => (
    <RequestInfoItem request={request} key={request._id} />
  ));

  return <div className="CST_request-info-panel">{requests}</div>;
};

RequestInfo.propTypes = {
  requestArray: PropTypes.array.isRequired
};

export default RequestInfo;
