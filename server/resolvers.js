import { GraphQLError } from 'graphql';
import { createMessage, getMessages } from './db/messages.js';
import { PubSub } from 'graphql-subscriptions';
import { getUsers } from './db/users.js';
import { withFilter } from 'graphql-subscriptions';

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
    messages: (_root, { chatId }, { userId }) => {
      if (!userId) throw unauthorizedError();
      return getMessages(chatId);
    },
    users: (_root, _args, { userId }) => {
      if(!userId) throw unauthorizedError();
      return getUsers();
    }
  },

  Mutation: {
    addMessage: async (_root, { text, chatId }, { userId }) => {
      if (!userId) throw unauthorizedError();
      const message = await createMessage(userId, text, chatId);
      // add message to websocket stream
      pubSub.publish(websocketTriggers.messageAdded, { messageAdded: message })
      return message
    },
  },

  Subscription: {
    messageAdded: {
        // establish stream with specific trigger name, but the stream is empty by default
        // _root is parent object, args is subscription argument and context is passed ourself
        subscribe: withFilter((_root, _args, context) => { 
          if(!context.userId) throw unauthorizedError()
          return pubSub.asyncIterator(websocketTriggers.messageAdded) 
        }, 
        ({ messageAdded }, { chatId }) => {
          const reversedChatId = chatId.split('-').reverse().join('-');
          const { chatId: msgChatId } = messageAdded || {};
          return msgChatId === chatId || msgChatId === reversedChatId
        }
      )
    }
  }
};

function unauthorizedError() {
  return new GraphQLError('Not authenticated', {
    extensions: { code: 'UNAUTHORIZED' },
  });
}
