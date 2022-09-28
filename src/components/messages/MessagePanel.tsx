import { useEffect } from "react";
import { MessageType } from "../../utils/types";
import { MessageInputField } from "./MessageInputField";
import { MessageItem } from "./MessageItem";

type MessagePanelProps = {
  messages: MessageType[];
  height: string;
};

export const MessagePanel = ({ messages, height }: MessagePanelProps) => {
  const formattedMessages = () => {
    let isFirst = true;

    return messages.map((message, index, arr) => {
      const currentMsg = messages[index];
      const nextMsg = messages[index + 1];

      if (!nextMsg) {
        return (
          <MessageItem key={message.id} message={message} showAvatar={false} />
        );
      }

      if (currentMsg.author.id === nextMsg.author.id && isFirst === true) {
        isFirst = false;
        return (
          <MessageItem key={message.id} message={message} showAvatar={true} />
        );
      }

      if (currentMsg.author.id === nextMsg.author.id && isFirst === false) {
        return (
          <MessageItem key={message.id} message={message} showAvatar={false} />
        );
      }

      if (currentMsg.author.id !== nextMsg.author.id && isFirst === true) {
        return (
          <MessageItem key={message.id} message={message} showAvatar={true} />
        );
      }

      if (currentMsg.author.id !== nextMsg.author.id) {
        isFirst = true;
        return (
          <MessageItem key={message.id} message={message} showAvatar={false} />
        );
      }
    });
  };

  useEffect(() => {
    formattedMessages();
  }, []);

  return (
    <div className={`${height}`}>
      <div className="flex h-[93%] flex-col-reverse overflow-y-scroll">
        {formattedMessages()}
      </div>
      <div className="flex h-[7%] flex-none items-center border-t-[1px] border-black/50">
        <MessageInputField />
      </div>
    </div>
  );
};
