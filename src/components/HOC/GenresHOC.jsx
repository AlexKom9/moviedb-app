import React from "react";
import PropTypes from "prop-types";
import CallApi from "../../api/api";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";

const mapStateToProps = ({ movies }) => {
  return {
    with_genres: movies.filters.with_genres
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onChangePage: actions.actionCreatorChangePage,
      updateFilters: actions.actionCreatorUpdateFilters,
      resetFilters: actions.actionCreatorResetFilters
    },
    dispatch
  );
};

export default Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class GenresContainer extends React.Component {
      constructor(props) {
        super();
        this.state = {
          allGenres: []
        };
      }

      static propTypes = {
        with_genres: PropTypes.array.isRequired,
        updateFilters: PropTypes.func.isRequired
      };

      componentDidMount() {
        CallApi.get("/genre/movie/list").then(data => {
          this.setState({
            allGenres: data.genres
          });
        });
      }

      changeHandler = event => {
        console.log(event);
        const { with_genres, updateFilters } = this.props;

        const currentId = event.target.id;

        let value = [];
        if (with_genres.includes(currentId)) {
          value = with_genres.filter(id => id !== currentId);
        } else {
          value = [...with_genres, currentId];
        }
        updateFilters({
          with_genres: value
        });
      };

      render() {
        const { allGenres } = this.state;
        const { with_genres } = this.props;
        return (
          <Component
            onChange={this.changeHandler}
            allGenres={allGenres}
            with_genres={with_genres}
          />
        );
      }
    }
  );
