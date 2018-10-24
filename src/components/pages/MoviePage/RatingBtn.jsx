import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreatorToggleLoginForm } from "../../../actions/actionsModals";
import CallApi from "../../../api/api";
import { withRouter } from "react-router-dom";

import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

class RatingBtn extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownRating: false,
      choosedRating: null,
      rating: 0,
      rated: null,
      favorite: null,
      watchlist: null
    };
  }

  toggle() {
    const { toggleLoginForm, isAuth } = this.props;
    if (isAuth) {
      this.setState(prevState => ({
        dropdownRating: !prevState.dropdownRating,
        rating: this.state.choosedRating
      }));
    } else {
      toggleLoginForm();
    }
  }

  handleHover = index => {
    this.setState({
      rating: index
    });
  };

  setRating = index => {
    const {
      session_id,
      match: {
        params: { id }
      }
    } = this.props;
    console.log(id);
    this.setState(
      {
        choosedRating: index
      },
      () => {
        const queryStringParams = {
          session_id
        };
        const body = {
          value: index * 2
        };
        CallApi.post(`/movie/${id}/rating`, {
          params: queryStringParams,
          body
        });
      }
    );
  };

  createStars = () => {
    let stars = [];
    for (let i = 1; i < 6; i++) {
      stars.push(
        <div
          className="rating-btn__star"
          onMouseEnter={() => this.handleHover(i)}
          onClick={() => this.setRating(i)}
          key={i}
        >
          <FontAwesomeIcon
            icon={[i <= this.state.rating ? "fas" : "far", "star"]}
            color={i <= this.state.choosedRating ? "black" : "gray"}
          />
        </div>
      );
    }
    return stars;
  };

  componentDidMount() {
    const {
      session_id,
      match: {
        params: { id }
      }
    } = this.props;
    const queryStringParam = {
      session_id
    };
    CallApi.get(`/movie/${id}/account_states`, {
      params: queryStringParam
    }).then(data => {
      this.setState({
        choosedRating: data.rated.value / 2
      });
    });
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownRating} toggle={this.toggle}>
        <DropdownToggle className="rating-btn" tag="div">
          <FontAwesomeIcon icon={["far", "star"]} />
        </DropdownToggle>
        <DropdownMenu className="rating-btn__drop">
          <div className="rating-btn__inner">{this.createStars()}</div>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

RatingBtn.propTypes = {};

const mapStateToProps = ({ authentication }) => {
  return {
    session_id: authentication.session_id,
    isAuth: authentication.isAuth
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleLoginForm: actionCreatorToggleLoginForm
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RatingBtn));
