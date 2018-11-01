import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/actions";

class SortBy extends React.PureComponent {
  static propTypes = {
    // onChangeFilters: PropTypes.func.isRequired
  };

  static defaultProps = {
    options: [
      {
        label: "Популярные по убыванию",
        value: "popularity.desc"
      },
      {
        label: "Популярные по возростанию",
        value: "popularity.asc"
      },
      {
        label: "Рейтинг по возростанию",
        value: "vote_average.asc"
      },
      {
        label: "Рейтинг по убыванию",
        value: "vote_average.desc"
      }
    ]
  };

  render() {
    const { updateFilters, sort_by, options } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="sort_by">Сортировать по:</label>
        <select
          className="form-control"
          id="sort_by"
          name="sort_by"
          value={sort_by}
          onChange={(event) => updateFilters({[event.target.name]: event.target.value})}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const mapStateToProps = ({ movies }) => {
  return {
    sort_by: movies.filters.sort_by
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateFilters: actions.actionCreatorUpdateFilters,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortBy);
