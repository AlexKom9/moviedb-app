import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import AppConsumerHOC from '../../HOC/AppConsumerHOC'

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.props.toggleLoginForm}
        >
          Login
        </button>

        <Modal isOpen={this.props.showLoginForm} toggle={this.props.toggleLoginForm}>
          <ModalBody>
            <LoginForm/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

Login.propTypes = {};

export default AppConsumerHOC(Login);
