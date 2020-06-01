import { createStore } from "redux";

const configureStore = () => {
  const reducer = (state = {}, action: any) => state;
  return createStore(reducer);
};

export default configureStore;
