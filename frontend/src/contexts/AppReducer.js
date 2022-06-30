import actions from "./AppActions";

const reducer = (state, action) => {
    switch (action.type) {
      case actions.REFRESH_POSTS:
        return {...state, posts: action.payload};
      // case actions.SET_EDIT_POST:
        // TODO action.payload should contain the post
        // TODO create a new state with a variable
        // TODO in this this new state, find the post that has been modified
        // TODO modify the `editPost` prop of this post
        // TODO return new state
        // return {...state, posts: action.payload};
      default:
        return state;
    }
};

export default reducer;