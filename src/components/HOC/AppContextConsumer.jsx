import React from "react";
import { AppContext } from "../App";

const AppContextConsumer = Component => {
  return (
    <AppContext.Consumer>
      {context => (
        <Component
          session_id={context.session_id}
          updateSessionId={context.updateSessionId}
          user={context.user}
          updateUser={context.updateUser}
        />
      )}
    </AppContext.Consumer>
  );
};

AppContextConsumer.displayName = "AppContextConsumer";

export default AppContextConsumer;
