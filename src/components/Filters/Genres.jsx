import React from "react";
// import { API_URL, API_KEY_3 } from "../../api/api";

export default class Genres extends React.Component {
  constructor(props) {
    super();
    this.state = {
      allGenres: []
    };
  }

  componentDidMount() {
    let link = `https://api.themoviedb.org/3/genre/movie/list?api_key=942fe0c9aeb6728941df8e74f3fbce09&language=ru-RU`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          allGenres: data.genres
        });
      });
  }

  changeHandler = event => {
    const {
      filters: { with_genres },
      onChangeFilters
    } = this.props;

    const currenId = event.target.id;
    let value = [];
    if (with_genres.includes(currenId)) {
      value = with_genres.filter(id => id !== currenId);
    } else {
      value = [...with_genres, currenId];
    }
    onChangeFilters({
      target: {
        name: "with_genres",
        value: value
      }
    });
  };

  render() {
    const { allGenres } = this.state;
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
