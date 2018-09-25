import React, { Component } from "react";
import PropTypes from "prop-types";
import { API_URL, API_KEY_3, API_KEY_4 } from "../api/api";

class Login extends Component {
  sendPromises = () => {

    const fetchAPI = (url, options = {}) => {
      return new Promise((resolve, reject) => {
        fetch(url, options)
          .then(response => {
            if (response.status < 400) {
              return response.json();
            } else {
              throw response;
            }
          })
          .then(data => {
            resolve(data);
          })
          .catch(response => {
            response.json().then(error => {
              reject(error);
            });
          });
      });
    };

    // const getRequestToken = () => {
    //   return new Promise((resolve, reject) => {
    //     fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //       .then(response => {
    //         if (response.status < 400) {
    //           return response.json();
    //         } else {
    //           throw response;
    //         }
    //       })
    //       .then(data => {
    //         resolve(data);
    //       })
    //       .catch(response => {
    //         response.json().then(error => {
    //           reject(error);
    //         });
    //       });
    //   });
    // };
    //
    // const validateWithLogin = body => {
    //   return new Promise((resolve, reject) => {
    //     fetch(
    //       `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //       {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //           "Content-type": "application/json"
    //         },
    //         body: JSON.stringify(body)
    //       }
    //     )
    //       .then(response => {
    //         if (response.status < 400) {
    //           return response.json();
    //         } else {
    //           throw response;
    //         }
    //       })
    //       .then(data => {
    //         resolve(data);
    //       })
    //       .catch(response => {
    //         response.json().then(error => {
    //           reject(error);
    //         });
    //       });
    //   });
    // };

    fetchAPI(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(data => {
        return fetchAPI(
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
        );
      })
      .then(data => {
        return fetchAPI(
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
        );
      })
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log("error", error);
      });
    // fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     fetch(
    //       `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //       {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //           "Content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //           username: "evgeniypodgaetskiy",
    //           password: "temp1992",
    //           request_token: data.request_token
    //         })
    //       }
    //     )
    //       .then(response => response.json())
    //       .then(data => {
    //         console.log(data);
    //         fetch(
    //           `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
    //           {
    //             method: "POST",
    //             mode: "cors",
    //             headers: {
    //               "Content-type": "application/json"
    //             },
    //             body: JSON.stringify({
    //               request_token: data.request_token
    //             })
    //           }
    //         )
    //           .then(response => response.json())
    //           .then(data => console.log(data));
    //       });
    //   });
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
