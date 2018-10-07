import React, { Component } from "react";
import PropTypes from "prop-types";
import AppConsumerHOC from '../../HOC/AppConsumerHOC'
import { Redirect } from "react-router-dom";

class AccountFavorites extends Component {
  render() {
    console.log(this.props.isAuth);
    return(this.props.isAuth ? (<div className="container">AccountFavorites</div>):(<Redirect to="/"/>))
  }
}

AccountFavorites.propTypes = {};

export default AppConsumerHOC(AccountFavorites);
