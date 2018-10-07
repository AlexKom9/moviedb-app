import React from "react";
import { AppContext } from "../App";

export default Component =>
  class AppConsumerHOC extends React.Component {
    render() {
      return (
        <AppContext.Consumer>
          {context => (
            <Component
              {...this.props}
              {...context}
              // session_id={context.session_id}
              // updateSessionId={context.updateSessionId}
              // user={context.user}
              // updateUser={context.updateUser}
              // updateAuth={context.updateAuth}
              // isAuth={context.isAuth}
              // favorite_movies={context.favorite_movies}
              // logOut={context.logOut}
              // showLoginForm={context.showLoginForm}
              // toggleLoginForm={context.toggleLoginForm}
              // hideLoginForm={context.hideLoginForm}
            />
          )}
        </AppContext.Consumer>
      );
    }
  };
