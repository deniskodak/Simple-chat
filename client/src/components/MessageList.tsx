import { useEffect, useRef } from 'react';
import { MessageListProps, MessageRowProps } from '../lib/types';

function MessageList({ user, messages, receiver }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // scroll to bottom to make the last message visible
      container.scrollTo(0, container.scrollHeight);
    }
  }, [messages]);

  return (
    <div ref={containerRef} className="box" style={{ height: '50vh', overflowY: 'scroll' }}>
      <table>
        <tbody>
          {messages.map((message) => (
            <MessageRow receiver={receiver} key={message.id} user={user} message={message} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MessageRow({ user, message, receiver }: MessageRowProps) {

  const getMessageAuthorName = () => {
    return message.userId === user.id ? user.username : receiver.username
  }

  return (
    <tr>
      <td className="py-1">
        <span className={(message.userId === user.id) ? 'username tag is-primary' : 'username tag'}>
          {getMessageAuthorName()}
        </span>
      </td>
      <td className="pl-4 py-1">
        {message.text}
      </td>
    </tr>
  );
}

export default MessageList;
