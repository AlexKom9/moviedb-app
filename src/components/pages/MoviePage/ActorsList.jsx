import React, { Component } from "react";
import PropTypes from "prop-types";
import CallApi from '../../../api/api'

class ActorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    // const { movie: { id } } = this.props;
    const {movieURLID} = this.props;

    CallApi.get(`/movie/${movieURLID}/credits`).then(data => {
      this.setState({
        data: data.crew
      })
    });
  };

  render() {
    const {data} = this.state;
    return <div>
      <div className="row">
        {data.map(item => (
          <div key={item.id} className={`col-3 mb-4`}>
            <img src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} alt=""/>
         </div>
        ))}
      </div>

    </div>;
  }
}

ActorsList.propTypes = {
  movie: PropTypes.object.isRequired
};

export default ActorsList;