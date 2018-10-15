import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreatorToggleLoginForm } from "../../../actions/actions";

class Login extends Component {
  render() {
    const {toggleLoginForm, showLoginForm } = this.props;
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={toggleLoginForm}
        >
          Login
        </button>

        <Modal
          isOpen={showLoginForm}
          toggle={toggleLoginForm}
        >
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showLoginForm: state.modals.showLoginForm
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    toggleLoginForm: actionCreatorToggleLoginForm
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
