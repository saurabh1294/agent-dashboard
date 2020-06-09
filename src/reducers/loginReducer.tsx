import {
  LOGGED_IN_SUCCESS,
  LOGGED_OUT_SUCCESS,
  FETCH_CUSTOMER_INFO_SUCCESS,
  LOGGED_IN_FAILURE,
  LOGGED_OUT_FAILURE,
  AGENT_AUTHENTICATE,
  FETCH_CUSTOMER_INFO_FAILURE
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
  isCustInfoLoaded: false
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

    // TODO use seamless immutable npm package here
    // return state.setIn(["isLoggedIn", "authToken", "authError"],
    // action.payload.data.newSessionStaffauth.result === "GOOD",
    // action.payload.data.newSessionStaffauth.stok,
    // action.payload.data.newSessionStaffauth.result);

    // TODO below code is for testing purpose only
    /*return [
        // ...state,
        {
          isLoggedIn: action.payload.data.newSessionStaffauth.result === "GOOD",
          authToken: action.payload.data.newSessionStaffauth.stok,
          authError: action.payload.data.newSessionStaffauth.result
        },
        action
      ];*/
    // alert('returning state here from reducer');

    // return [
    //   {
    //     isLoggedIn: action.payload.data.newSessionStaffauth.result === "GOOD",
    //     authToken: action.payload.data.newSessionStaffauth.stok,
    //     authError: action.payload.data.newSessionStaffauth.result
    //   },
    //   action
    // ]
    // set state here based on payload value

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
