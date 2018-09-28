import React from 'react';
// import { API_URL, API_KEY_3 } from "../../api/api";

export default class Genres extends React.Component {
  constructor(props) {
    super();
    this.state = {
      allGenres: [],
    }
  }

  componentDidMount() {
    const link = 'https://api.themoviedb.org/3/genre/movie/list?api_key=942fe0c9aeb6728941df8e74f3fbce09&language=ru-RU';
    fetch(link)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          allGenres: data.genres,
        });
      });
  }

  changeHandler = (event) => {
    const {
      filters: { with_genres },
      onChangeFilters,
    } = this.props;

    const currentId = event.target.id;
    let value = [];
    if (with_genres.includes(currentId)) {
      value = with_genres.filter(id => id !== currentId);
    } else {
      value = [...with_genres, currentId];
    }
    onChangeFilters({
      target: {
        name: 'with_genres',
        value,
      },
    });
  };

  render() {
    const { allGenres } = this.state;
    const {
      filters: { with_genres }
    } = this.props;
    console.log(with_genres, allGenres[0]);
    return (
      <div className="mb-4">
        <ul>
          {allGenres.map(genre => (
            <li key={genre.id}>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={genre.id}
                  onChange={this.changeHandler}
                  checked={with_genres.includes(String(genre.id))}
                />
                <label className="custom-control-label" htmlFor={genre.id}>
                  {genre.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
