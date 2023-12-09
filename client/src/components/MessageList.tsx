import { useEffect, useRef } from 'react';
import { MessageListProps, MessageRowProps } from '../lib/types';

function MessageList({ user, messages }: MessageListProps) {
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
            <MessageRow key={message.id} user={user} message={message} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MessageRow({ user, message }: MessageRowProps) {
  return (
    <tr>
      <td className="py-1">
        <span className={(message.user === user) ? 'tag is-primary' : 'tag'}>
          {message.user}
        </span>
      </td>
      <td className="pl-4 py-1">
        {message.text}
      </td>
    </tr>
  );
}

export default MessageList;
