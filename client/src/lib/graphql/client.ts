import { ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache, Operation, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getAccessToken } from '../auth';
import { Kind, OperationTypeNode } from 'graphql';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient as createWsClient } from 'graphql-ws'

/**
 * Auth link used to add authorization header if token exists in local storage
 */
const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  }
  return forward(operation);
});

/**
 * Combined auth and http link, order is important
 */
const httpLink = concat(authLink, createHttpLink({ uri: 'https://chat-graphql-0b20.onrender.com/graphql' }));

/**
 * Web socket link with token
 */
const wsLink = new GraphQLWsLink(createWsClient({
  url: 'ws://chat-graphql-0b20.onrender.com/graphql',
  connectionParams: () => ({ accessToken: getAccessToken() })
}))

/**
 * Client used for Apollo provider in the App component, so query hooks can work
 */
export const apolloClient = new ApolloClient({
  // split checks if isSubscription return true, then it calls first link, otherwise second link.
  link: split(isSubscription, wsLink, httpLink),
  cache: new InMemoryCache(),
});

/**
 * Defines wether ws link should be used or no for provided graph ql operation
 */
function isSubscription(operation: Operation): boolean {
  // gets operation definition from operation query
  const definition = getMainDefinition(operation.query)
  return definition.kind === Kind.OPERATION_DEFINITION &&
   definition.operation === OperationTypeNode.SUBSCRIPTION;
}