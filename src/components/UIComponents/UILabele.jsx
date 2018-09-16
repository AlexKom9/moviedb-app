import React, { Component } from "react";

export default class UILabele extends Component {
  render() {
    const {id, children} = this.props;
    return <label htmlFor={id}>{children()}</label>;
  }
}
