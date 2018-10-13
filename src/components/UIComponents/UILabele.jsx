import React from 'react';

export default class UILabele extends React.PureComponent {
  render() {
    const { id, children } = this.props;
    return <label htmlFor={id}>{children()}</label>;
  }
}
