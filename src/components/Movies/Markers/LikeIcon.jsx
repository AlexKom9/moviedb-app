import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LikeIcon extends React.Component {
    render() {
    const { marked, changeMark } = this.props;
    return (
      <div onClick={changeMark}>
        <FontAwesomeIcon icon={[marked ? "fas" : "far", "heart"]} />
      </div>
    );
  }
}

export default LikeIcon
