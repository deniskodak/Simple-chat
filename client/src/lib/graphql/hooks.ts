import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { addMessageMutation, messagesQuery, messageAddedSubscription } from './queries';

export function useAddMessage() {
  const [mutate] = useMutation(addMessageMutation);

  const addMessage = async (text) => {
    const { data: { message } } = await mutate({
      variables: { text },
    });

    return message;
  };

  return { addMessage };
}

export function useMessages() {
  const { data } = useQuery(messagesQuery);
  // establish connection with ws stream
  useSubscription(messageAddedSubscription, { onData: ({ client, data: result }) => {
    // origin query is messageAdded, but we applied alias to rename it to message
    const newMessage = result.data.message;
    client.cache.updateQuery({query: messagesQuery}, (cachedData) => {
      const cachedMessages = cachedData.messages || [];
      return { messages: cachedMessages.concat([newMessage]) }
    })
  }})

  return {
    messages: data?.messages ?? [],
  };
}
