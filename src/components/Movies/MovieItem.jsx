import React from "react";
import { Link } from "react-router-dom";
import LikeIcon from "./Markers/LikeIcon";
import WatchIcon from "./Markers/WatchIcon";
import MarkHOC from "./Markers/MarkHOC";
import AppConsumerHOC from "../HOC/AppConsumerHOC";




const MovieLike = MarkHOC(LikeIcon, 'favorite_movies');
const MovieToWatch = MarkHOC(WatchIcon, 'watchlist');

class MovieItem extends React.Component {

  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body shadow-sm">
          <Link to={`/movie/${item.id}`}>{item.title}</Link>
          <div className="card-text">
            Рейтинг:
            {item.vote_average}
          </div>

          <div className="movie-item__like float-right ml-2">
            <MovieToWatch id={item.id} />
          </div>

          <div className="movie-item__like float-right">
            <MovieLike id={item.id} />
          </div>

        </div>
      </div>
    );
  }
}

export default AppConsumerHOC(MovieItem);
