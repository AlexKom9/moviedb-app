import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import MoviesList from "../../Movies/MoviesList/MoviesList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreatorGetWatchlist } from "../../../actions/actionsAccount";

class AccountWatchlist extends Component {
  componentDidMount() {
    const { isAuth, session_id, user } = this.props;
    console.log(user);
    if (isAuth) {
      this.props.getWatchlist({
        session_id,
        user_id: user.id
      });
    }
  }
  render() {
    return this.props.isAuth ? (
      <div className="container">
        <div className="row mt-4">
          <div className="col-8">
            <MoviesList movies={this.props.watchlist} />
          </div>
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
)(AccountWatchlist);
