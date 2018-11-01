import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreatorToggleLoginForm } from "../../../actions/actionsModals";
import CallApi from "../../../api/api";
import { withRouter } from "react-router-dom";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

const circleDiagram = (rated) => (
  <div className="rating-btn__circle">
    <CircularProgressbar
      percentage={rated * 2 * 10}
      text={`${rated * 2}`}
      style={{path: {fill: '#3987e0'}, text: {fill: '#3987e0'}}}
      initialAnimation={true}
    />
  </div>
);

class RatingBtn extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownRating: false,
      rated: null,
      hoverRating: null,
      favorite: null,
      watchlist: null
    };
  }

  toggle() {
    const { toggleLoginForm, isAuth } = this.props;
    if (isAuth) {
      this.setState(prevState => ({
        dropdownRating: !prevState.dropdownRating,
        rating: this.state.rated
      }));
    } else {
      toggleLoginForm();
    }
  }

  handleHover = index => {
    this.setState({
      hoverRating: index
    });
  };

  onLeaveDropDown = () => {
    this.setState({
      hoverRating: this.state.rated
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
        rated: index
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

  getAccountState() {
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
        rated: data.rated.value / 2,
        hoverRating: data.rated.value / 2
      });
    });
  }

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
            icon={[i <= this.state.hoverRating ? "fas" : "far", "star"]}
            color={i <= this.state.rated ? "black" : "gray"}
          />
        </div>
      );
    }
    return stars;
  };

  componentDidMount() {
    this.getAccountState();
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownRating} toggle={this.toggle}>
        <DropdownToggle className="rating-btn" tag="div">
          <FontAwesomeIcon icon={[this.state.rated ? 'fas':'far', "star"]} />
          {this.state.rated ? <div className="rating-btn__your-rating">Ваш рейтинг : {circleDiagram(this.state.rated)}</div>: null}
        </DropdownToggle>
        <DropdownMenu
          className="rating-btn__drop"
          onMouseLeave={() => this.onLeaveDropDown()}
        >
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
