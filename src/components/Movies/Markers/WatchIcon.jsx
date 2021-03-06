import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class WatchIcon extends React.Component {
    render() {
    const { marked, changeMark } = this.props;
    return (
      <div onClick={changeMark}>
        <FontAwesomeIcon icon={[marked ? "fas" : "far", "bookmark"]} />
      </div>
    );
  }
}

export default WatchIcon
