import React, { Component } from "react";
import PropTypes from "prop-types";
import CallApi from "../../../api/api";

class MovieImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrops: [],
      posters: []
    };
  }

  componentDidMount() {
    const { movieId } = this.props;
    // this.setState({
    //   data: [1,2,3]
    // })
    CallApi.get(`/movie/${movieId}/images`).then( data => {
      this.setState({
        backdrops: data.backdrops,
        posters: data.posters,
      })
    });
  }

  render() {
    const { backdrops, posters } = this.state;
    return (<div>
      <div>
      {backdrops.map(item => <span>{item}</span>)}
      </div>
      <div>
        {posters.map(item => <span>{item}</span>)}
      </div>
      </div>)
  }
}

MovieImages.propTypes = {};

export default MovieImages;
