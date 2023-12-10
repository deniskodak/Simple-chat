import { graphql } from '../../generated/gql'
/**
 * GraphQl Query for getting messages list
 */
export const messagesQuery = graphql(`
  query MessagesQuery($chatId: ID!) {
    messages(chatId: $chatId) {
      id
      userId,
      text,
      chatId,
    }
  }
`);

/**
 * GraphQl Query for getting user list
 */
export const usersQuery = graphql(`
  query UsersQuery {
    users {
      id
      username
    }
  }
`);


/**
 * GraphQl Mutation for creating new message
 */
export const addMessageMutation = graphql(`
  mutation AddMessageMutation($text: String!, $chatId: ID!) {
    message: addMessage(text: $text, chatId: $chatId) {
      id
      userId,
      text,
      chatId
    }
  }
`);

/**
 * GraphQl Subscription for receiving single new message
 */
export const messageAddedSubscription = graphql(`
  subscription MessageAddedSubscription($chatId: String!) {
    # alias for proper object structure
    message: messageAdded(chatId: $chatId) {
      id,
      userId,
      text,
      chatId
    }
  }
`); 