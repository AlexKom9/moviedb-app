import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class UICheckBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      checked: props.checked
    };
  }

  changeHandler = event => {
    this.setState(
      {
        checked: !this.state.checked
      }
    );
    this.props.onChange(event);
  };

  render() {
    const { id, labelText } = this.props;
    // if (this.props.id === 99)          {
    //   console.log("render")
    // }
    return (
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id={id}
          onChange={this.changeHandler}
          checked={this.state.checked}
        />
        <label className="custom-control-label" htmlFor={id}>
          {labelText}
        </label>
      </div>
    );
  }
}

UICheckBox.propTypes = {
  id: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired
};

export default UICheckBox;
