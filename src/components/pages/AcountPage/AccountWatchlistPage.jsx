import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import MoviesList from "../../Movies/MoviesList/MoviesList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreatorGetWatchlist } from "../../../actions/actionsAccount";

class AccountWatchlistPage extends Component {
  render() {
    return this.props.isAuth ? (
      <div className="container">
        <div className="row mt-4">
            <MoviesList movies={this.props.watchlist} col={'col-4'}/>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = store => {
  return {
    isAuth: store.authentication.isAuth,
    session_id: store.authentication.session_id,
    user: store.authentication.user,
    watchlist: store.account.watchlist
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getWatchlist: actionCreatorGetWatchlist
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountWatchlistPage);
