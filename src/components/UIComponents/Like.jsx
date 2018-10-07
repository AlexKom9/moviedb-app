import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CallApi from "../../api/api";
import _ from 'lodash'
import LikeHOC from './LikeHOC'

class Like extends React.Component {
    render() {
    const { liked, changeLike } = this.props;
    return (
      <div onClick={changeLike}>
        <FontAwesomeIcon icon={[liked ? "fas" : "far", "heart"]} />
      </div>
    );
  }
}

export default LikeHOC(Like)
