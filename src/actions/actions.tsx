import {
  LOGGED_IN_SUCCESS,
  LOGGED_IN_FAILURE,
  LOGGED_OUT_FAILURE,
  // LOGGED_OUT_SUCCESS,
  AGENT_AUTHENTICATE,
  FETCH_CUSTOMER_INFO_SUCCESS,
  FETCH_CUSTOMER_INFO_FAILURE
} from "./actionTypes";
import axios from "axios";
import gql from "graphql-tag";
import loginReducer from "../reducers/loginReducer";

const baseURL = "http://stile.pt.optusnet.com.au"; // actual endpoint from Brett
const custInfoUrl = `${baseURL}/custInfo`;
// const authApiUrl = `${baseURL}/auth`;

export const fetchCustomerInfo = (searchQuery: string) => {
  return (dispatch: any) => {
    return axios
      .get(`${custInfoUrl}`)
      .then(response => {
        dispatch(fetchCustomerInfoSuccess(response.data));
      })
      .catch(error => {
        console.log("ERROR in api call");
        dispatch(fetchCustomerInfoFailure(error));
        throw error;
      });
  };
};

export const fetchCustomerInfoSuccess = (data: any) => {
  return {
    type: FETCH_CUSTOMER_INFO_SUCCESS,
    state: "FETCH_CUSTOMER_INFO_SUCCESS",
    response: data
  };
};

export const fetchCustomerInfoFailure = (data: any) => {
  return {
    type: FETCH_CUSTOMER_INFO_FAILURE,
    state: "FETCH_CUSTOMER_INFO_FAILURE",
    response: data
  };
};

export const loginSuccess = (data: any) => {
  return {
    type: LOGGED_IN_SUCCESS,
    state: "LOGGED_IN_SUCCESS",
    response: data
  };
};

export const loginFailure = (data: any) => {
  return {
    type: LOGGED_IN_FAILURE,
    state: "LOGGED_IN_FAILURE",
    response: data
  };
};

export const logoutSuccess = (data: any) => {
  return {
    type: LOGGED_IN_SUCCESS,
    state: "LOGGED_IN_SUCCESS",
    response: data
  };
};

export const logoutFailure = (data: any) => {
  return {
    type: LOGGED_OUT_FAILURE,
    state: "LOGGED_OUT_FAILURE",
    response: data
  };
};

export const checkAuth = (data: any) => {
  return {
    type: AGENT_AUTHENTICATE,
    state: "AGENT_AUTHENTICATE",
    response: data
  };
};

export const authenticate = (username: string, password: string) => {
  //const someQuery = gql`query { fake }`;
  const someQuery = gql`
    mutation NewStaffAuthSession($username: String!, $password: String!) {
      newSessionStaffauth(username: $username, password: $password) {
        stok
      }
    }
  `;

  console.log("firing graphql query", someQuery);
  return async (dispatch: any, getState: any, client: any) => {
    // TODO uncomment the below 5 lines later
    // const request = await client.mutate({
    //   mutation: someQuery,
    //   variables: { username, password }
    // });
    // const result = await request;

    // TODO comment below code later on - stub for testing different API responses
    const result = {
      data: {
        newSessionStaffauth: {
          result: "GOOD",
          stok: "fake:token123:fred"
        }
      }
    };
    console.log("this is the result from graphql endpoint", result);
    dispatch(
      loginReducer(
        {
          username,
          password,
          authToken: "",
          isLoggedIn: false,
          isLoggedOut: true,
          isCustInfoLoaded: false
        } as any,
        {
          type: AGENT_AUTHENTICATE,
          payload: result
        }
      )
    );
  };
};
