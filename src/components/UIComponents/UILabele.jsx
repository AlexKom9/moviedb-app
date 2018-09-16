import React from "react";

export default class UILabele extends React.PureComponent {

  render() {
    const { id, children } = this.props;
    console.log("UILabel render");
    return <label htmlFor={id}>{children()}</label>;
  }
}
