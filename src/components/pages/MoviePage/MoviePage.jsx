import React from "react";
import Like from "../../Movies/Markers/LikeIcon";
import WatchIcon from "../../Movies/Markers/WatchIcon";
import CallApi from "../../../api/api";
import MarkHOC from "../../Movies/Markers/MarkHOC";
import RatingBtn from "./RatingBtn";
import MovieTabs from "./MovieTabs";

const MovieLike = MarkHOC(Like, "favorite");
const MovieToWatch = MarkHOC(WatchIcon, "watchlist");

export default class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`).then(data => {
      console.log(data);
      this.setState({
        movie: data
      });
    });
  }

  render() {
    const { movie } = this.state;
    console.log(this.props);
    const {
      match: {
        params: { id }
      }
    } = this.props;
    // console.log(movie_id)
    // console.log(movie);
    // let { history, match, location } = this.props;
    // const tab = /[^/]*$/.exec(location.pathname)[0];
    // console.log(tab);
    return (
      movie && (
        <div className="container">
          <div className="row mt-4">
            <div className="col-4">
              <img
                className="card-img-top card-img--height"
                src={`https://image.tmdb.org/t/p/w500${(movie &&
                  movie.backdrop_path) ||
                  (movie && movie.poster_path)}`}
                alt=""
              />
            </div>
            <div className="col-8">
              <h2 className="title mb-4">{movie && movie.title}</h2>
              <p className="mb-4">{movie && movie.overview}</p>
              <span>Рейтинг Пользователей: {movie.vote_average}</span>
              <div>
                <div className="movie-item__like float-right ml-2">
                  <MovieToWatch id={id} />
                </div>
                <div className="movie-item__like float-right">
                  <MovieLike id={id} />
                </div>
                <div className="movie-item__star">
                  <RatingBtn />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <MovieTabs
                movie={movie}
              />
            </div>
          </div>
        </div>
      )
    );
  }
}
