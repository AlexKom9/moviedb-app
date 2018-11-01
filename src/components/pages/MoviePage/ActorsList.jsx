import React, { Component } from "react";
import PropTypes from "prop-types";
import Gallery from "react-grid-gallery";
import CallApi from "../../../api/api";
import { withRouter } from "react-router-dom";
import Loader from "../../Loader";

class ActorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actor_gallery: [],
      isFetching: false
    };
  }

  getActorsList = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.setState({
      isFetching: true
    });
    CallApi.get(`/movie/${id}/credits`).then(data => {
      console.log(data);
      const filteredActorsByImage = data.cast.filter(item => {
        return item.profile_path;
      });
      this.setState({
        actor_gallery: filteredActorsByImage.map(actor => ({
          src: `https://image.tmdb.org/t/p/w500/${actor.profile_path}`,
          thumbnail: `https://image.tmdb.org/t/p/w500/${actor.profile_path}`,
          thumbnailWidth: 120,
          thumbnailHeight: 180,
          caption: actor.character,
        })),
        isFetching: false
      });
    });
  };

  componentDidMount() {
    this.getActorsList();
  }

  render() {
    const { actor_gallery, isFetching } = this.state;
    return (
      <div className="mt-4">
        {isFetching ? <Loader/> : actor_gallery.length ? <Gallery images={actor_gallery} enableImageSelection={false} /> : <p className="text-center">Актеры не найдены</p>}
      </div>
    );
  }
}

ActorsList.propTypes = {
  movie: PropTypes.object.isRequired
};

export default withRouter(ActorsList);
