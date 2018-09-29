import React from "react";
import { AppContext } from "../App";
import HeaderMenu from "./HeaderMenu";

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      showMenu: false
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        showMenu: false
      });
    }
  }

  render() {
    const { user } = this.props;
    const { showMenu } = this.state;
    return (
      <div className="head-user" ref={this.setWrapperRef}>
        <img
          width="40"
          className="rounded-circle"
          src={`https://secure.gravatar.com/avatar/${
            user.avatar.gravatar.hash
          }.jpg?s=64`}
          alt="user avatar"

          onClick={() => {
            this.setState({ showMenu: !this.state.showMenu });
          }}
        />
        <div className="user-head__menu">{showMenu && <HeaderMenu />}</div>
      </div>
    );
  }
}

const UserContainer = props => {
  return (
    <AppContext.Consumer>
      {context => {
        return <User user={context.user} {...props} />;
      }}
    </AppContext.Consumer>
  );
};

UserContainer.displayName = "UserContainer";

export default UserContainer;
