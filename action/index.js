export const Config = (arg) => {
  return {
    type: "render",
    payload: arg,
  };
};
export const Update = (arg) => {
  return {
    type: "update",
    payload: arg,
  };
};
