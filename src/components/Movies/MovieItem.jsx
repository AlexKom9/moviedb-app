import React from "react";
import { Link } from "react-router-dom";
import Like from "../UIComponents/Like";
import LikeHOC from "../UIComponents/LikeHOC";
import AppConsumerHOC from "../HOC/AppConsumerHOC";

class MovieItem extends React.Component {
  // static getDerivedStateFromProps(props){
  //   return {
  //     like: props.like
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.like !== this.props.like) {
  //     this.setState({
  //       like: this.props.like
  //     });
  //   }
  // }

  render() {
    const { item } = this.props;
    // console.log(LikeHOC(<Like id={item.id} />));
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

          <div className="movie-item__like float-right">
            <Like id={item.id} />
          </div>
        </div>
      </div>
    );
  }
}

export default AppConsumerHOC(MovieItem);
