import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import MoviesList from "../../Movies/MoviesList/MoviesList";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreatorGetFavorite } from "../../../actions/actionsAccount";

class AccountFavoritesPage extends Component {
  render() {
    return this.props.isAuth ? (
      <div className="container">
        <div className="row mt-4">
          <MoviesList movies={this.props.favorite} col={'col-4'} />
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

AccountFavoritesPage.propTypes = {};

const mapStateToProps = store => {
  return {
    isAuth: store.authentication.isAuth,
    session_id: store.authentication.session_id,
    user: store.authentication.user,
    favorite: store.account.favorite
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getFavorites: actionCreatorGetFavorite
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountFavoritesPage);
