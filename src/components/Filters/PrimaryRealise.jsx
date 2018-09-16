import React from "react";
import PropTypes from "prop-types";
import UISelect from "../UIComponents/UISelect";
// import _ from 'lodash'

export default class PrimaryRealise extends React.PureComponent {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
  };
  static defaultProps = {
    options: [
      {
        label: "Выберите год",
        value: "0",
        image: './lol.jpg'
      },
      {
        label: "2018",
        value: "2018"
      },
      {
        label: "2005",
        value: "2005"
      },
      {
        label: "1991",
        value: "1991"
      }
    ]
  };


  // shouldComponentUpdate(nextProps, nextState) {
  //   return !_.isEqual(nextProps, this.props)
  // }


  render() {
    const { onChangeFilters, primary_release_year, options } = this.props;
    return (
      <UISelect
        id={primary_release_year}
        name="primary_release_year"
        value={primary_release_year}
        onChange={onChangeFilters}
        label={() => <p>Год релиза:</p> }
        // options={options}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
            {/*{option.image && <img src={option.image} />}*/}
          </option>
        ))}
      </UISelect>
    );
  }
}
