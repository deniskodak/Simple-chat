import { GraphQLError } from 'graphql';
import { createMessage, getMessages } from './db/messages.js';
import { PubSub } from 'graphql-subscriptions';

/**
 * Publish/Subscribe instance for websocket
 */
const pubSub = new PubSub();

/**
 * Possible websocket trigger list
 */
const websocketTriggers = {
  messageAdded: 'MESSAGE_ADDED'
}

/**
 * Graphql schema resolvers
 */
export const resolvers = {
  Query: {
    messages: (_root, _args, { user }) => {
      if (!user) throw unauthorizedError();
      return getMessages();
    },
  },

  Mutation: {
    addMessage: async (_root, { text }, { user }) => {
      if (!user) throw unauthorizedError();
      const message = await createMessage(user, text);
      // add message to websocket stream
      pubSub.publish(websocketTriggers.messageAdded, { messageAdded: message })
      return message
    },
  },

  Subscription: {
    messageAdded: {
        // establish stream with specific trigger name, but the stream is empty by default
        // _root is parent object, args is subscription argument and context is passed ourself
        subscribe: (_root, _args, context) => { 
          if(!context.user) throw unauthorizedError()
          return pubSub.asyncIterator(websocketTriggers.messageAdded) }
      } 
  }
};

function unauthorizedError() {
  return new GraphQLError('Not authenticated', {
    extensions: { code: 'UNAUTHORIZED' },
  });
}
