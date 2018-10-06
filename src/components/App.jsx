import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList/MoviesList";
import Header from "./Header/Header";
import { API_KEY_3, API_URL, fetchApi } from "../api/api";
import Cookies from "universal-cookie";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart as fasFaHeart, faBookmark as fasBookmark } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farFaHeart, faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons'

const cookies = new Cookies();


library.add(fasFaHeart, farFaHeart, fasBookmark, farBookmark);

export const AppContext = React.createContext();

const initialState = {
  filters: {
    sort_by: "vote_average.desc",
    primary_release_year: "0",
    with_genres: []
  },
  page: 1,
  total_pages: "",
  user: null,
  session_id: null
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ...initialState
    };
  }

  onChangeFilters = event => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value
    };
    this.setState({
      filters: newFilters
    });
  };

  onChangePage = page => {
    this.setState({
      page
    });
  };

  // testFun() {
  //   console.log("es5-- ", this);
  //   this.setState({
  //     yo: "yo"
  //   });
  // }
  // testFunction = () => {
  //   console.log("arrow -- ", this);
  // };

  getTotalPages = totalPages => {
    this.setState({
      total_pages: totalPages
    });
  };

  updateUser = user => {
    console.log(user);
    this.setState({
      user: user
    });
  };

  updateSessionId = session_id => {
    if (session_id) {
      console.log("session_id: ", session_id);
      cookies.set("session_id", session_id, {
        path: "/",
        maxAge: 2592000
      });
      this.setState({
        session_id: session_id
      });
    } else {
      this.setState({
        session_id: null,
        user: null
      });
      cookies.remove("session_id");
    }
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      this.setState({
        session_id: session_id
      });
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateUser(user);
      });
    }
  }

  render() {
    const { filters, page, total_pages, user } = this.state;
    // this.testFunction();
    // this.testFun();

    return (
      <AppContext.Provider
        value={{
          user: user,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          session_id: this.state.session_id
        }}
      >
        <div onClick={this.testFun}>Hello</div>
        <Header
          updateUser={this.updateUser}
          updateSessionId={this.updateSessionId}
          user={user}
        />
        <div className="container">
          <div className="row mt-4">
            <div className="col-4">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <h3>Фильтры:</h3>
                  <div className="mb-4">
                    <button
                      className="btn btn-light"
                      onClick={() =>
                        this.setState({
                          ...initialState
                        })
                      }
                    >
                      Очистить фильры
                    </button>
                  </div>
                  <Filters
                    filters={filters}
                    onChangeFilters={this.onChangeFilters}
                    onChangePage={this.onChangePage}
                    total_pages={total_pages}
                    page={page}
                  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <MoviesList
                filters={filters}
                changePage={this.onChangePage}
                getTotalPages={this.getTotalPages}
                page={page}
              />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}
