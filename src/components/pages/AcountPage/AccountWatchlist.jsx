import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import MoviesList from "../../Movies/MoviesList/MoviesList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AccountWatchlist extends Component {
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
    watchlist: store.account.watchlist
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({

  }, dispatch)
};

export default connect(mapStateToProps)(AccountWatchlist);
