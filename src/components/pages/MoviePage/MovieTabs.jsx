import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink, Route, Switch } from "react-router-dom";

import MovieImages from "./MovieImages";
import SimilarMovies from "./SimilarMovies";
import MovieDetails from './MovieDetails'


class MovieTabs extends Component {
  render() {
    const { movie, url } = this.props;
    return (
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink
              to={`${url}/images`}
              className="nav-link"
              activeClassName="active"
            >
              Images
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`${url}/similar`}
              className="nav-link"
              activeClassName="active"
            >
              Similar
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`${url}/details`}
              className="nav-link"
              activeCalssName="active"
            >
              Details
            </NavLink>
          </li>
        </ul>
        <div className="tab-content">
          <Switch>
            <Route
              path={`${url}/images`}
              component={() => <MovieImages movieId={movie.id} />}
            />
            <Route
              path={`${url}/similar`}
              component={() => <SimilarMovies movieId={movie.id} />}
            />
            <Route
              path={`${url}/details`}
              component={() => <MovieDetails movie={movie} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

MovieTabs.propTypes = {
  url: PropTypes.string.isRequired,
  movie: PropTypes.object.isRequired
};

export default MovieTabs;
