import React from "react";
import PropTypes from 'prop-types'

export default class PrimaryRealise extends React.Component {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired
  };
  static defaultProps = {
    options: [
      {
        label: "Выберите год",
        value: '0'
      },
      {
        label: "2018",
        value: '2018'
      },
      {
        label: "2005",
        value: '2005'
      },
      {
        label: "1991",
        value: '1991'
      }
    ]
  };

  render() {
    const {onChangeFilters, primary_release_year, options} = this.props;
    return (
      <div className="form-group">
        <label htmlFor="primary_release_year">Год релиза :</label>
        <select
          className="form-control"
          id="primary_release_year"
          name="primary_release_year"
          value={primary_release_year}
          onChange={onChangeFilters}>
          {options.map((option)=> (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    )
  }
};
