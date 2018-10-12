import React from "react";
import Like from '../../Movies/Markers/Like'
import ToWatch from '../../Movies/Markers/ToWatch'
import CallApi from "../../../api/api";
import markHOC from "../../Movies/Markers/markHOC";

export default class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}?`).then(data => {
      console.log(data);
      this.setState({
        movie: data
      });
    });
  }

  render() {
    const MovieLike = markHOC(Like, 'favorite_movies');
    const MovieToWatch = markHOC(ToWatch, 'watchlist');
    console.log(this.props);
    const { movie } = this.state;
    console.log(movie);
    return (
      <div className="container">
        {movie && <div className="row mt-4">
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
            <div>
              <div className="movie-item__like float-right ml-2">
                <MovieToWatch id={movie.id} />
              </div>

              <div className="movie-item__like float-right">
                <MovieLike id={movie.id} />
              </div>
            </div>
          </div>
        </div>}

      </div>
    );
  }
}
