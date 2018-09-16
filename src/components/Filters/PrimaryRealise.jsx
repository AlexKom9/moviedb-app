import React from "react";
import PropTypes from "prop-types";
import UISelect from "../UIComponents/UISelect";

export default class PrimaryRealise extends React.Component {
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
