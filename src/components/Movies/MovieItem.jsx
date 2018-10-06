import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppConsumerHOC from "../HOC/AppConsumerHOC";
import CallApi from '../../api/api'

class MovieItem extends React.Component {
  constructor(props) {
    super();
    this.state = {
      booked: false,
      favor: false
    };
    this.changeFavor = this.changeFavor.bind(this);
    this.changeBooked = this.changeBooked.bind(this);
  }

  changeFavor() {
    const { session_id } = this.props;

    if (!session_id) {
    }

    this.setState({
      favor: !this.state.favor
    });
  }

    changeBooked() {
      this.setState({
        booked: !this.state.booked
      });
    }



    export default class MovieItem extends React.Component {
  render() {
    const { item, session_id } = this.props;
    console.log(session_id);
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

          <div className="movie-item__favor" onClick={this.changeFavor}>
            <FontAwesomeIcon icon={["fas", "heart"]} />
          </div>

          <div className="movie-item__bookmaktr" onClick={this.changeBooked}>
            <FontAwesomeIcon icon={["fas", "bookmark"]} />
          </div>
        </div>
      </div>
    );
  }
}

export default AppConsumerHOC(MovieItem);
