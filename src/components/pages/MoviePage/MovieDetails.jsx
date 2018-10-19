import React, { Component } from "react";

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }
  render() {
    const {movie} = this.props;
    return (
    <div className="mt-4">
      <table className="table">
        <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Язык оригинала</td>
          <td>{movie.original_language}</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Страна</td>
          <td>{movie.production_countries.map((item, index) => <span key={index}>{item.name}</span>)}</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Дата выхода</td>
          <td>{movie.release_date}</td>
        </tr>
        </tbody>
      </table>
    </div>
    );
  }
}

MovieDetails.propTypes = {};

export default MovieDetails;
