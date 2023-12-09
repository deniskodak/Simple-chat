import { MessageInputProps } from "../lib/types";

function MessageInput({ onSend }: MessageInputProps) {

  const handleKeyDown = (event): void => {
    if (event.key === 'Enter') {
      onSend(event.target.value);
      event.target.value = '';
    }
  };

  return (
    <div className="box">
      <div className="control">
        <input className="input" type="text" placeholder="Say something..."
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default MessageInput;
