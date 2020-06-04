import {
  LOGGED_IN_SUCCESS,
  LOGGED_OUT_SUCCESS,
  FETCH_CUSTOMER_INFO_SUCCESS,
  LOGGED_IN_FAILURE,
  LOGGED_OUT_FAILURE,
  AGENT_AUTHENTICATE,
  FETCH_CUSTOMER_INFO_FAILURE
} from "../actions/actionTypes";


export interface State {
  username: string,
    password: string,
    authToken: string,
    isLoggedIn: boolean,
    isLoggedOut: boolean,
    isCustInfoLoaded: boolean
}

const initialState: State = {
  username: '',
  password: '',
  authToken: '',
  isLoggedIn: false,
  isLoggedOut: true,
  isCustInfoLoaded: false
}

export default function loginReducer(state = initialState, action: any) {
  switch (action.type) {
    case AGENT_AUTHENTICATE:
      console.log(state, 'authenticate agent payload received from backend', action.payload);
      // set state here based on payload value
      break;

    case LOGGED_IN_SUCCESS:
      console.log("LOGGED_IN");
      // set login successful state here
      return [state, action];

    case LOGGED_IN_FAILURE:
      console.log("LOGGED_IN_FAILURE");
      // reset login successful state here
      return [state, action];

    case LOGGED_OUT_SUCCESS:
      console.log("LOGGED_OUT_SUCCESS");
      // set logout successful state here
      return [state, action];

    case LOGGED_OUT_FAILURE:
      console.log("LOGGED_OUT_FAILURE");
      // reset logout successful state here
      return [state, action];

    case FETCH_CUSTOMER_INFO_SUCCESS:
      console.log("FETCH_CUSTOMER_INFO_SUCCESS", state, action);
      // set customer info fetching successful state here
      return [state, action];
    // add more actions here if needed

    case FETCH_CUSTOMER_INFO_FAILURE:
      console.log("FETCH_CUSTOMER_INFO_FAILURE", state, action);
      // reset customer info fetching successful state here
      return [state, action];
    // add more actions here if needed

    default:
      console.log("default action");
      return state;
  }
}
