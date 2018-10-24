import React, { Component } from "react";
import CallApi from "../../../api/api";
import { withRouter } from "react-router-dom";

class MovieImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrops: [],
      posters: []
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    CallApi.get(`/movie/${id}/images`).then(data => {
      this.setState({
        backdrops: data.backdrops,
        posters: data.posters
      });
    });
  }

  render() {
    const { backdrops, posters } = this.state;
    return (
      <div>
        <div>
          {backdrops.map(item => (
            <span>{item}</span>
          ))}
        </div>
        <div>
          {posters.map(item => (
            <span>{item}</span>
          ))}
        </div>
      </div>
    );
  }
}

MovieImages.propTypes = {};

export default withRouter(MovieImages);
