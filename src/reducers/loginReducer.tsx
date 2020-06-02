import {
  LOGGED_IN_SUCCESS,
  LOGGED_OUT_SUCCESS,
  FETCH_CUSTOMER_INFO_SUCCESS,
  LOGGED_IN_FAILURE,
  LOGGED_OUT_FAILURE,
  FETCH_CUSTOMER_INFO_FAILURE
} from "../actions/actionTypes";

export default function faqReducer(state = [], action: any) {
  alert(action.type);
  switch (action.type) {
    case LOGGED_IN_SUCCESS:
      console.log("LOGGED_IN");
      // set login successful state here
      return [...state, action];

    case LOGGED_IN_FAILURE:
      console.log("LOGGED_IN_FAILURE");
      // reset login successful state here
      return [...state, action];

    case LOGGED_OUT_SUCCESS:
      console.log("LOGGED_OUT_SUCCESS");
      // set logout successful state here
      return [...state, action];

    case LOGGED_OUT_FAILURE:
      console.log("LOGGED_OUT_FAILURE");
      // reset logout successful state here
      return [...state, action];

    case FETCH_CUSTOMER_INFO_SUCCESS:
      console.log("FETCH_CUSTOMER_INFO_SUCCESS", state, action);
      // set customer info fetching successful state here
      return [...state, action];
    // add more actions here if needed

    case FETCH_CUSTOMER_INFO_FAILURE:
      console.log("FETCH_CUSTOMER_INFO_FAILURE", state, action);
      // reset customer info fetching successful state here
      return [...state, action];
    // add more actions here if needed

    default:
      console.log("default action");
      return state;
  }
}
