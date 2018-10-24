import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
// import {withRouter } from 'react-router'

import MovieImages from "./MovieImages";
import SimilarMovies from "./SimilarMovies";
import MovieDetails from "./MovieDetails";
import ActorsList from "./ActorsList";

class MovieTabs extends Component {
  render() {
    const {
      movie,
      match: { params: { id } }
    } = this.props;
    console.log(id);
    return (
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink to={`/movie/${id}/images`} className="nav-link">
              Images
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/movie/${id}/similar`} className="nav-link">
              Similar
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/movie/${id}/details`} className="nav-link">
              Details
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/movie/${id}/actors`}
              className="nav-link"
              activeClassName="active"
            >
              Actors
            </NavLink>
          </li>
        </ul>
        <div className="tab-content">
          <Switch>
            <Route
              path={`/movie/:id/images`}
              component={() => (
                <MovieImages />
              )}
            />
            <Route
              path={`/movie/:id/similar`}
              component={() => <SimilarMovies />}
            />
            <Route
              path={`/movie/:id/details`}
              component={() => <MovieDetails movie={movie} />}
            />
            <Route
              path={`/movie/:id/actors`}
              component={() => (
                <ActorsList movie={movie} />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

MovieTabs.propTypes = {
  movie: PropTypes.object.isRequired
};

export default withRouter(MovieTabs);
