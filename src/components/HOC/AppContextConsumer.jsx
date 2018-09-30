import React from "react";
import { AppContext } from "../App";

export default Component =>
  class AppContextConsumer extends React.Component {
    render() {
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
    }
  };

// const AppContextConsumer = Component => {
//   console.log(AppContext);
//   return (
//     <AppContext.Consumer>
//       {context => (
//         <Component
//           session_id={context.session_id}
//           updateSessionId={context.updateSessionId}
//           user={context.user}
//           updateUser={context.updateUser}
//         />
//       )}
//     </AppContext.Consumer>
//   );
// };

// AppContextConsumer.displayName = "AppContextConsumer";
//
// export default AppContextConsumer;
