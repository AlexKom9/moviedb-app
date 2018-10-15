import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import MoviesList from "../../Movies/MoviesList/MoviesList";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class AccountFavorites extends Component {
  render() {
    console.log(this.props.isAuth);
    return this.props.isAuth ? (
      <div className="container">
        <div className="row mt-4">
          <div className="col-8">
            <MoviesList movies={this.props.favorite} />
          </div>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

AccountFavorites.propTypes = {};

const mapStateToProps = store => {
  return {
    isAuth: store.authentication.isAuth,
    favorite: store.account.favorite
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({

  }, dispatch)
};

export default connect(mapStateToProps)(AccountFavorites);

