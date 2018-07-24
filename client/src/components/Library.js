import React, { Component } from "react";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import { logoutAction } from "../redux/actions/userActions";

import Navbar from "./Navbar";

class Library extends Component {
  render() {
    const { auth, logout } = this.props;
    return (
      <div>
        <Navbar isAuthenticated={auth.isAuthenticated} logout={logout} />
        <h1 className="title">Library</h1>
      </div>
    );
  }
}

Library.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.authState,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
