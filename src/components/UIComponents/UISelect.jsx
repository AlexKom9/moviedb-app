import React from "react";
import PropTypes from "prop-types";
import UILabel from "./UILabele";

export default class UISelect extends React.Component {
  //todo: hw
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.isRequired
  };

  render() {
    const { id, name, value, onChange, label, options } = this.props;
    console.log(this.props.children);
    return (
      <div className="form-group">
        <UILabel id={id}>{label}</UILabel>
        <select
          className="form-control"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        >
          {this.props.children}
        </select>
      </div>
    );
  }
}
