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
          <th scope="row">Статус </th>
          <td>{movie.status}</td>
        </tr>
        <tr>
          <th scope="row">Дата выхода</th>
          <td>{movie.release_date}</td>
        </tr>
        <tr>
          <th scope="row">Продолжительность</th>
          <td>{movie.runtime} минут</td>
        </tr>

        <tr>
          <th scope="row">Язык оригинала</th>
          <td>{movie.original_language}</td>
        </tr>
        <tr>
          <th scope="row">Страна</th>
          <td>{movie.production_countries.map((item, index) => <span key={index}>{item.name}</span>)}</td>
        </tr>
        <tr>
          <th scope="row">Бюджет</th>
          <td>{movie.budget}$</td>
        </tr>
        <tr>
          <th scope="row">Сборы</th>
          <td>{movie.revenue}$</td>
        </tr>
        <tr>
          <th scope="row">Компания</th>
          <td>
          {movie.production_companies.map((company)=>(<div key={company.id}>
            <span className="badge badge-info mr-4">{company.name}</span>
            {/*<img style={{width: '50px'}} src={`https://image.tmdb.org/t/p/w500${company.logo_path}`} alt=""/>*/}
          </div>))}
          </td>
        </tr>
        <tr>
          <th scope="row">Жанры</th>
          <td>
          {movie.genres.map((genre)=>(<div key={genre.id}>
            <span className="badge badge-info mr-4">{genre.name}</span>
          </div>))}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    );
  }
}

MovieDetails.propTypes = {};

export default MovieDetails;
