import React from "react";

import moment from "moment";

export default props => {
  const { bookInfo } = props;
  return (
    <div className="card">
      <header className="card-header CST_is-opposed">
        <p className="card-header-title">{bookInfo.title}</p>{" "}
        <time className="CST_title-date">
          {moment(bookInfo.createdAt).format("Do MMMM YYYY HH:mm:ss")}
        </time>
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
        <ul>
          {bookInfo.bookStatus.applicants.map(applicant => (
            <li key={applicant._id}>{applicant.name}</li>
          ))}
        </ul>
      </div>
      <footer className="card-footer">
        <label className="card-footer-item" />
      </footer>
    </div>
  );
};
