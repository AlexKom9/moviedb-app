import React from "react";
import { Link } from "react-router-dom";
import Like from "./Markers/Like";
import ToWatch from "./Markers/ToWatch";
import markHOC from "./Markers/markHOC";
import AppConsumerHOC from "../HOC/AppConsumerHOC";

class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    const MovieLike = markHOC(Like, 'favorite_movies');
    const MovieToWatch = markHOC(ToWatch, 'watchlist');
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <Link to={`/movie/${item.id}`}>{item.title}</Link>
          <div className="card-text">
            Рейтинг:
            {item.vote_average}
          </div>
          <div className="movie-item__like float-right">
            <MovieLike id={item.id} />
            <MovieToWatch id={item.id} />
          </div>
        </div>
      </div>
    );
  }
}

export default AppConsumerHOC(MovieItem);
