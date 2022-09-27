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
    return messages.map((message, index, arr) => {
      const currentMsg = arr[index];
      const nextMsg = arr[index + 1];

      if (arr.length === index + 1) {
        return (
          <MessageItem key={message.id} message={message} sameAuthor={false} />
        );
      }

      if (currentMsg.author.id === nextMsg.author.id) {
        return (
          <MessageItem key={message.id} message={message} sameAuthor={true} />
        );
      }

      return (
        <MessageItem key={message.id} message={message} sameAuthor={false} />
      );
    });
  };

  useEffect(() => {
    formattedMessages();
  });

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
