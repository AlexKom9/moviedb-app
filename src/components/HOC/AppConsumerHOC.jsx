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
              session_id={context.session_id}
              updateSessionId={context.updateSessionId}
              user={context.user}
              updateUser={context.updateUser}
              favorite_movies={context.favorite_movies}
            />
          )}
        </AppContext.Consumer>
      );
    }
  };
