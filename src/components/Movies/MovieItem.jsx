import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppConsumerHOC from "../HOC/AppConsumerHOC";
import CallApi from "../../api/api";

class MovieItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      to_watch: false,
      like: props.like
    };
    this.changeLike = this.changeLike.bind(this);
  };

  // static getDerivedStateFromProps(props){
  //   return {
  //     like: props.like
  //   }
  // }

  changeLike() {
    const { session_id } = this.props;

    if (!session_id) {
    }
    this.setState({
      like: !this.state.like
    }, () => {
      const queryStringParams = {
        session_id: this.props.session_id
      };

      const body = {
        "media_type": "movie",
        "media_id": this.props.item.id,
        "favorite": this.state.like
      };
      CallApi.post(`/account/${this.props.user.id}/favorite?`, { params: queryStringParams, body: body });
    });

  };

  componentDidUpdate(prevProps) {
    if (prevProps.like !== this.props.like) {
      this.setState({
        like: this.props.like
      });
    }
  }

  render() {
    const { item } = this.props;
    const {like} = this.state;


    console.log(this.props);
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

          <div className="movie-item__like float-right" onClick={this.changeLike}>
            <FontAwesomeIcon icon={[like ? "fas": "far", "heart"]} />
          </div>
          <span>{this.props.like}</span>

        </div>
      </div>
    );
  }
}

export default AppConsumerHOC(MovieItem);
