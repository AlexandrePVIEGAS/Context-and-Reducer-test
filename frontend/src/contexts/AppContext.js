import React from "react";
import reducer from "./AppReducer";
import actions from "./AppActions";

const initialState = {
  posts: []
};

export const AppContext = React.createContext();

const Provider = ({ children }) => {
  
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    posts: state.posts,
    refreshPosts: (posts) => {
      dispatch({ type: actions.POSTS_FETCHED, payload: posts });
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default Provider;
  