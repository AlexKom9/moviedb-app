import React from "react";
import CallApi from "../../../api/api";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  actionCreatorHideLoginForm,
  actionCreatorUpdateAuth
} from "../../../actions/actions";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    repeatPassword: "",
    errors: {},
    submitting: false
  };

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: null,
        base: null
      }
    }));
  };

  handleBlur = event => {
    console.log("on blur");
    const errors = this.validateFields();
    const name = event.target.name;
    const errorByName = errors[name];
    if (errorByName) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [name]: errorByName
        }
      }));
    }
  };

  validateFields = () => {
    const errors = {};
    if (this.state.username === "") {
      errors.username = "Not empty";
    }

    if (this.state.password !== this.state.repeatPassword) {
      errors.repeatPassword = "Password must be the same";
    }

    if (this.state.password.length < 5) {
      errors.password = "Password must be at least 5 character";
    }
    return errors;
  };

  onSubmit = () => {
    console.log(this.props);
    this.setState({
      submitting: true
    });
    let session_id = null;
    CallApi.get("/authentication/token/new?")
      .then(data => {
        return CallApi.post("/authentication/token/validate_with_login?", {
          body: {
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token
          }
        });
      })
      .then(data => {
        return CallApi.post("/authentication/session/new?", {
          body: { request_token: data.request_token }
        });
      })
      .then(data => {
        session_id = data.session_id;
        return CallApi.get("/account?", {
          params: { session_id: data.session_id }
        });
      })
      .then(user => {
        this.setState(
          {
            submitting: false
          },
          () => {
            this.props.updateAuth({ user, session_id });
          }
        );
      })
      .catch(error => {
        console.log("error", error);
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message
          }
        });
      });
  };

  onLogin = e => {
    e.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    } else {
      this.onSubmit();
    }
  };

  componentWillUnmount() {
    this.props.hideLoginForm();
  }

  render() {
    const {
      username,
      password,
      repeatPassword,
      errors,
      submitting
    } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <div className="form-group">
            <label htmlFor="username">Пользователь</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Пользователь"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onBlur={this.handleBlur}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">Повторите пароль</label>
            <input
              type="password"
              className="form-control"
              id="repeatPassword"
              placeholder="Повторите пароль"
              name="repeatPassword"
              value={repeatPassword}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.repeatPassword && (
              <div className="invalid-feedback">{errors.repeatPassword}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAuth: actionCreatorUpdateAuth,
      hideLoginForm: actionCreatorHideLoginForm
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
