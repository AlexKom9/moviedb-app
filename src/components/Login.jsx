import React, { Component } from "react";
import PropTypes from "prop-types";
import { API_URL, API_KEY_3, API_KEY_4 } from "../api/api";

class Login extends Component {
  sendPromises = () => {
    fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(response => response.json())
      .then(data => {
        fetch(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              username: "evgeniypodgaetskiy",
              password: "temp1992",
              request_token: data.request_token
            })
          }
        )
          .then(response => response.json())
          .then(data => {
            console.log(data)
            fetch(
              `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
              {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-type": "application/json"
                },
                body: JSON.stringify({
                  request_token: data.request_token
                })
              }
            )
              .then(response => response.json())
              .then(data => console.log(data));
          });
      });
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.sendPromises}
        >
          Login
        </button>
      </div>
    );
  }
}

Login.propTypes = {};

export default Login;
