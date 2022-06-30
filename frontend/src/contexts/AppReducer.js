import actions from "./AppActions";

const reducer = (state, action) => {
    switch (action.type) {
      case actions.POSTS_FETCHED:
        return {...state, posts: action.payload};
      default:
        return state;
    }
};

export default reducer;