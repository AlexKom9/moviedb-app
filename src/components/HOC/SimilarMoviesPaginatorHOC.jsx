import React from "react";
import PropTypes from 'prop-types'

// const { page, total_pages, onChangePage } = this.props;

export default Component =>
  class SimilarMoviesPaginatorHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        page: props.page,
        total_pages: props.total_pages
      }
    }
    render() {
      return <Component {...this.props} />;
    }
  };