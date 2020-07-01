import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ReduxAsyncQueue from "redux-async-queue";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
// import loginReducer from "../reducers/loginReducer";
import rootReducer from "../reducers/rootReducer";

interface DefaultOptions {
  watchQuery: any;
  query: any;
}

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all"
  }
};

export const client = new ApolloClient({
  link: createHttpLink({
    uri: `http://stile.pt.optusnet.com.au/graphql`
  }) as any,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});

const configureStore = () => {
  // const reducer = (state = {}, action: any) => state;
  return createStore(
    rootReducer,
    applyMiddleware(thunk.withExtraArgument(client), ReduxAsyncQueue)
  );
};

export default configureStore;
