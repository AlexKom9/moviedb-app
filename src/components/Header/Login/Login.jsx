import React, { Component } from "react";
import PropTypes from "prop-types";
import { API_URL, API_KEY_3, API_KEY_4 } from "../../../api/api";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  render() {
    const { updateUser, updateSessionId } = this.props;
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.toggleModal}
        >
          Login
        </button>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm updateUser={updateUser} updateSessionId={updateSessionId}/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

Login.propTypes = {};

export default Login;
