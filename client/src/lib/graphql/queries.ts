import { graphql } from '../../generated/gql'
/**
 * GraphQl Query for getting messages list
 */
export const messagesQuery = graphql(`
  query MessagesQuery {
    messages {
      id
      user
      text
    }
  }
`);

/**
 * GraphQl Mutation for creating new message
 */
export const addMessageMutation = graphql(`
  mutation AddMessageMutation($text: String!) {
    message: addMessage(text: $text) {
      id
      user
      text
    }
  }
`);

/**
 * GraphQl Subscription for receiving single new message
 */
export const messageAddedSubscription = graphql(`
  subscription MessageAddedSubscription {
    # alias for proper object structure
    message: messageAdded {
      id,
      user,
      text
    }
  }
`); 