import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { addMessageMutation, messagesQuery, messageAddedSubscription, usersQuery } from './queries';

export function useAddMessage() {
  const [mutate] = useMutation(addMessageMutation);

  const addMessage = async (text: string, chatId: string) => {
    const { data: { message } } = await mutate({
      variables: { text, chatId },
    });

    return message;
  };

  return { addMessage };
}

export function useMessages(chatId: string) {
  console.log(chatId, 'chatId')
  const { data } = useQuery(messagesQuery, { variables: { chatId }, fetchPolicy: 'network-only' });
  // establish connection with ws stream
  useSubscription(messageAddedSubscription, { variables: { chatId }, onData: ({ client, data: result }) => {
    // origin query is messageAdded, but we applied alias to rename it to message
    const newMessage = result.data.message;
    
    client.cache.updateQuery({ query: messagesQuery, variables: { chatId }}, (cachedData) => {
      const cachedMessages = cachedData.messages || [];
      return { messages: cachedMessages.concat([newMessage]) }
    })
  }})

  return {
    messages: data?.messages ?? [],
  };
}

export function useUsers() {
  const { data } = useQuery(usersQuery);
  return data?.users || []
}