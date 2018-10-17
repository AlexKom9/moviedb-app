import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import MoviesList from "../../Movies/MoviesList/MoviesList";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreatorGetFavorite } from "../../../actions/actionsAccount";

class AccountFavorites extends Component {
  // componentDidMount() {
  //   const { isAuth, session_id, user } = this.props;
  //   if (isAuth) this.props.getFavorites({ session_id, user_id: user.id });
  // }
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountFavorites);
