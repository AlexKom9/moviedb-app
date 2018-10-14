import React, { Component } from "react";
import AppConsumerHOC from "../../HOC/AppConsumerHOC";
import { Redirect } from "react-router-dom";
import MoviesList from "../../Movies/MoviesList/MoviesList";

class AccountFavorites extends Component {
  render() {
    console.log(this.props.isAuth);
    return this.props.isAuth ? (
      <div className="container">
        <div className="row mt-4">
          <div className="col-8">
            <MoviesList movies={this.props.favorite_movies} />
          </div>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

AccountFavorites.propTypes = {};

export default AppConsumerHOC(AccountFavorites);
