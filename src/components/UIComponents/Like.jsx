import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Like extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      liked: false
    }
  }
  render(state = this.state) {
    const { like } = state;
    return (
      <div>
        <FontAwesomeIcon icon={[like ? "fas": "far", "heart"]} />
      </div>
    );
  }
}

export default Like;
