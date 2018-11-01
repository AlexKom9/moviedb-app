import React, { Component } from "react";

class Loader extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="lds-spinner">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}

Loader.propTypes = {};

export default Loader;
