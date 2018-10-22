import React from 'react';
import PropTypes from 'prop-types';
import UISelect from '../UIComponents/UISelect';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";

class PrimaryRealise extends React.PureComponent {

  static propTypes = {
    updateFilters: PropTypes.func.isRequired,
  };

  static defaultProps = {
    options: [
      {
        label: 'Выберите год',
        value: '0',
        image: './lol.jpg',
      },
      {
        label: '2018',
        value: '2018',
      },
      {
        label: '2005',
        value: '2005',
      },
      {
        label: '1991',
        value: '1991',
      },
    ],
  };

  render() {
    const { updateFilters, primary_release_year, options } = this.props;
    return (
      <UISelect
        id={primary_release_year}
        name="primary_release_year"
        value={primary_release_year}
        onChange={(event) => updateFilters({[event.target.name]: event.target.value})}
        label={() => <p>Год релиза:</p>}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
            {/* {option.image && <img src={option.image} />} */}
          </option>
        ))}
      </UISelect>
    );
  }
}

const mapStateToProps = ({ movies }) => {
  return {
    primary_release_year: movies.filters.primary_release_year
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
)(PrimaryRealise);
