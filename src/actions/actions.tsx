import {
  LOGGED_IN_SUCCESS,
  LOGGED_IN_FAILURE,
  LOGGED_OUT_FAILURE,
  LOGGED_OUT_SUCCESS,
  AGENT_AUTHENTICATE,
  FETCH_CUSTOMER_INFO_SUCCESS,
  FETCH_CUSTOMER_INFO_FAILURE,
  IS_AGENT_AUTHENTICATED,
  SEND_CUSTOMER_INFO
} from "./actionTypes";
// import axios from "axios";
import gql from "graphql-tag";

// const baseURL = "http://stile.pt.optusnet.com.au"; // actual endpoint from Brett
// const custInfoUrl = `${baseURL}/custInfo`;

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
    type: LOGGED_OUT_SUCCESS,
    state: "LOGGED_OUT_SUCCESS",
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
    payload: data
  };
};

export const isAuthenticatedResult = (data: any) => {
  return {
    type: IS_AGENT_AUTHENTICATED,
    state: "IS_AGENT_AUTHENTICATED",
    payload: data
  };
};

export const sendCustomerInfo = (data: any) => {
  return {
    type: SEND_CUSTOMER_INFO,
    state: "SEND_CUSTOMER_INFO",
    payload: data
  };
};

export const fetchCustomerInfo = (searchQuery: string) => {
  //const someQuery = gql`query GetCustomer($searchQuery : ID!) {
  const someQuery = gql`
    query GetCustomer($searchQuery: ID!) {
      getCustomerOnline(with: USERNAME, matching: $searchQuery) {
        result
        info {
          ipaddr
          mac
        }
      }
      getDeviceInfo(username: $searchQuery) {
        result
        device {
          deviceModel
        }
      }
      getCustomer(with: USERNAME, matching: $searchQuery) {
        result
        customer {
          username
          firstName
          lastName
          addressLines
          accessType
          avcID
          cvcID
          priID
          speedProfile
          serviceStatus
          voiceLines {
            number
            serviceID
          }
        }
      }
    }
  `;

  /*getCustomer(with: USERNAME matching: $searchQuery) {
      result
      customer {
        username
        firstName
        lastName
        addressLines
        accessType
        avcID
        cvcID
        priID
	speedProfile
      }
    }
  }`;*/

  return async (dispatch: any, getState: any, client: any) => {
    // TODO comment the below 4 lines when running locally
    let result = { data: {} };
    try {
      const request = await client.query({
        query: someQuery,
        variables: { searchQuery }
      });
      result = await request;
    } catch (err) {
      console.log(
        "fetchCustomerInfo() graphql error occurred in actions.tsx %%%************",
        err
      );
    } finally {
      console.log("fetchCustomerInfo() graphql finally block in actions.tsx");
    }

    // TODO uncomment when running locally - pass result.getCustomer - strip off data
    /*const result = {
      // data: {
        getCustomer: {
          customer: {
            accessType: "HFC",
            addressLines: [
              "Unit 2 23",
              "CARRINGTON Street",
              "NORTH STRATHFIELD NSW 2137"
            ],
            avcID: "AVC000000000001",
            cvcID: "CVC000000000001",
            firstName: "CHRISTINA",
            lastName: "LIM",
            macID: "123456789ABC",
            priID: "PRI400035253337",
            speed: "1138",
            username: "limchristina"
          },
          result: "GOOD"
        }
      // }
    };*/

    console.log("fetchCustInfo", JSON.stringify(someQuery));
    console.log(
      "this is the result from graphql fetchCustomerInfo endpoint",
      result
    );
    dispatch(sendCustomerInfo(result.data));
  };
};

export const isAuthenticated = () => {
  const someQuery = gql`
    query SessionInfo {
      sessionInfo {
        isAuthenticated
        authenticatedUser
        sessionExpires
      }
      dateTimeNow
    }
  `;

  return async (dispatch: any, getState: any, client: any) => {
    // TODO comment the below 4 lines when running locally
    let result = {};
    try {
      const request = await client.query({
        query: someQuery
      });
      result = await request;
    } catch (err) {
      console.log("error calling isAuthenticated graphql endpoint");
    } finally {
      console.log("isAuthenticated finally block");
    }

    // TODO uncomment when running locally
    // const result = {
    //   data: {
    //     dateTimeNow: "2020-06-12T00:34:55Z",
    //     sessionInfo: {
    //       authenticatedUser: "test",
    //       isAuthenticated: "false",
    //       sessionExpires: "2020-06-12T12:34:49Z"
    //     }
    //   }
    // };

    console.log("this is the result from graphql endpoint", result);
    dispatch(isAuthenticatedResult(result));
  };
};

export const logout = () => {
  const someQuery = gql`
    mutation Logout {
      logout {
        result
        stok
      }
    }
  `;

  return async (dispatch: any, getState: any, client: any) => {
    // TODO comment the below 4 lines when running locally
    let result = {};
    try {
      const request = await client.mutate({
        mutation: someQuery
      });
      result = await request;
    } catch (err) {
      console.log("Error calling logout() graphql API endpoint");
    } finally {
      console.log("In logout() of finally block");
    }

    // TODO uncomment when running locally
    // const result = {};

    console.log("this is the result from graphql endpoint", result);
    // alert("logout"+JSON.stringify(result));
    dispatch(logoutSuccess(result));
  };
};

export const authenticate = (username: string, password: string) => {
  // const someQuery = gql`query { fake }`;
  const someQuery = gql`
    mutation NewStaffAuthSession($username: String!, $password: String!) {
      newSessionStaffauth(username: $username, password: $password) {
        result
        stok
      }
    }
  `;

  console.log(
    "firing graphql query",
    someQuery,
    "with username and pass",
    username,
    password
  );
  return async (dispatch: any, getState: any, client: any) => {
    // TODO comment the below 5 lines when running locally
    let result = {};
    try {
      const request = await client.mutate({
        mutation: someQuery,
        variables: { username, password }
      });
      result = await request;
    } catch (err) {
      console.log("error calling authenticate mutation gql query");
    } finally {
      console.log("authentication actions.tsx finally block");
    }

    // TODO uncomment below - stub for testing different API responses when testing locally
    // const result = {
    //   data: {
    //     newSessionStaffauth: {
    //       result: "GOOD",
    //       stok: "fake:token123:fred"
    //     }
    //   }
    // };

    console.log("this is the result from graphql endpoint", result, getState());
    dispatch(checkAuth(result));
  };
};
