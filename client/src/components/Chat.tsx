import { useState } from 'react';
import { useAddMessage, useMessages } from '../lib/graphql/hooks';
import { ChatProps } from '../lib/types';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { UserList } from './UserList';
import { User } from '../generated/graphql';
import { generateChatId } from '../lib/helpers/generateChatId';

function Chat({ user }: ChatProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const chatId = generateChatId(selectedUser || user, user);
  const { messages } = useMessages(chatId);
  const { addMessage } = useAddMessage();

  const handleSend = async (text): Promise<void> => {
    await addMessage(text, chatId);
  };

  const renderTitle = () => {
    return !selectedUser || selectedUser?.id === user.id 
    ? "Your private chat"
    : <span> Chatting with <span className='username'>{selectedUser.username} </span>
      as <span className='username'>{user.username}</span>
      </span>
  }

  return (
    <section className="section">
      <div className="container">

        <div className='columns'>
          <div className='column is-one-fifth'>
            <UserList onUserSelect={setSelectedUser} selectedUserId={selectedUser?.id || ''}/>
          </div>

          <div className='column'>
            <h1 className="title is-4">{renderTitle()}</h1>
            <MessageList user={user} receiver={selectedUser || user} messages={messages} />
            <MessageInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chat;
