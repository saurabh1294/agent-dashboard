import {
  LOGGED_IN_SUCCESS,
  LOGGED_OUT_SUCCESS,
  FETCH_CUSTOMER_INFO_SUCCESS,
  LOGGED_IN_FAILURE,
  LOGGED_OUT_FAILURE,
  AGENT_AUTHENTICATE,
  FETCH_CUSTOMER_INFO_FAILURE,
  IS_AGENT_AUTHENTICATED,
  SEND_CUSTOMER_INFO,
  SEND_CUSTOMER_DIMPS_ONLINE_STATUS,
  SEND_CUSTOMER_RADIUS_DROPOUT_STATS,
  SEND_CUSTOMER_AVC_CVC_IDS,
  SEND_CUSTOMER_WIFI_STATS,
  SEND_DEVICE_INFO,
  SEND_CUSTOMER_ONLINE_INFO
} from "../actions/actionTypes";

// export interface State {
//   username: string;
//   password: string;
//   authToken: string;
//   isLoggedIn: boolean;
//   isLoggedOut: boolean;
//   isCustInfoLoaded: boolean;
//   set: Function;
//   setIn: Function;
// }

const initialState: any = {
  username: "",
  password: "",
  authToken: "",
  authError: "",
  isLoggedIn: false,
  isLoggedOut: true,
  isCustInfoLoaded: false,
  isAgentAuthenticated: false
  // set: Function,
  // setIn: Function
};

export default function loginReducer(state = initialState, action: any) {
  switch (action.type) {
    case AGENT_AUTHENTICATE:
      console.log(
        state,
        "authenticate agent payload received from backend",
        action.payload
      );

      return {
        ...state,
        ...action.payload
      };

    case IS_AGENT_AUTHENTICATED:
      console.log(state, "is agent authenticated result", action.payload);
      return {
        ...state,
        ...action.payload
      };

    case SEND_CUSTOMER_ONLINE_INFO:
      console.log(
        state,
        "got this customer online info from API",
        action.payload
      );
      return {
        ...state,
        ...action.payload
      };

    case SEND_DEVICE_INFO:
      console.log(state, "got this device info from API", action.payload);
      return {
        ...state,
        ...action.payload
      };

    case SEND_CUSTOMER_INFO:
      console.log(state, "got this customer info from API", action.payload);
      return {
        ...state,
        ...action.payload
      };

    case SEND_CUSTOMER_AVC_CVC_IDS:
      console.log(
        state,
        "got this AVC and CVC ID from graphql API",
        action.payload
      );
      return {
        ...state,
        ...action.payload
      };

    case SEND_CUSTOMER_WIFI_STATS:
      console.log(
        state,
        "got these wifi stats from graphql API",
        action.payload
      );
      return {
        ...state,
        ...action.payload
      };

    case SEND_CUSTOMER_DIMPS_ONLINE_STATUS:
      console.log(
        state,
        "got this DIMPS online status from the API",
        action.payload
      );
      return {
        ...state,
        ...action.payload
      };

    case SEND_CUSTOMER_RADIUS_DROPOUT_STATS:
      console.log(
        state,
        "got this RADIUS drop out stats from the API",
        action.payload
      );
      return {
        ...state,
        ...action.payload
      };

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
      return {
        ...state,
        ...action.payload
      };

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
