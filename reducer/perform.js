const initialState = {};

export const Reducer = (state = initialState, action) => {
  if (action.type === "render") {
    return action.payload;
  } else if (action.type === "update") {
    return action.payload;
  } else {
    return state;
  }
};
