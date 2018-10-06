import React from "react";
import CallApi from "../../../api/api";

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
    console.log(this.props);
    const { movie } = this.state;
    return (
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
            <div>
              <button type="button" className="btn btn-primary">
                Like
              </button>
              {/*<button type="button" className="btn btn-secondary">*/}
                {/*Secondary*/}
              {/*</button>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
