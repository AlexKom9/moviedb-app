import React, { Component } from "react";
import PropTypes from "prop-types";
import Gallery from "react-grid-gallery";
import CallApi from "../../../api/api";
import { withRouter } from "react-router-dom";

const IMAGES = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
    caption: "After Rain (Jeshu John - designerspics.com)"
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" }
    ],
    caption: "Boats (Jeshu John - designerspics.com)"
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    thumbnail:
      "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212
  }
];

class ActorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actor_gallery: []
    };
  }

  componentDidMount() {
    // const { movie: { id } } = this.props;
    const {
      match: {
        params: { id }
      }
    } = this.props;

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
          caption: actor.character
        }))
      });
    });
  }

  render() {
    const { actor_gallery } = this.state;
    return (
      <div className="mt-4">
        <Gallery images={actor_gallery} enableImageSelection={false} />
      </div>
    );
  }
}

ActorsList.propTypes = {
  movie: PropTypes.object.isRequired
};

export default withRouter(ActorsList);
