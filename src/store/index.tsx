import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ReduxAsyncQueue from "redux-async-queue";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

export const client = new ApolloClient({
  link: createHttpLink({ uri: `http://sample.com/graphql` }) as any,
  cache: new InMemoryCache()
});

const configureStore = () => {
  const reducer = (state = {}, action: any) => state;
  return createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(client), ReduxAsyncQueue)
  );
};

export default configureStore;
