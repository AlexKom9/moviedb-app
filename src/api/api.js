import queryString from "query-string";

export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "942fe0c9aeb6728941df8e74f3fbce09";

export const API_KEY_4 =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDJmZTBjOWFlYjY3Mjg5NDFkZjhlNzRmM2ZiY2UwOSIsInN1YiI6IjViOTk2ZmU5OTI1MTQxN2YwZjAwNDRjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DyQ5EAhU4gfsNyNTnPRqayFOn-SAy61d7iWwfWhOkkw";

export const fetchApi = (url, options = {}) => {
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

export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      ...params
    };
    // url = /discover/movie?
    // params = {
    //
    // }
    return fetchApi(
      `${API_URL}${url}${queryString.stringify(queryStringParams)}`,
      {
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        }
      }
    );
  }
  static post(url, options = {}) {
    const { params = {}, body={} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      ...params
    };
    return fetchApi(
      `${API_URL}${url}${queryString.stringify(queryStringParams)}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );
  }
}
