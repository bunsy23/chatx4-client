import { MessageType } from "../../utils/types";
import { MessageInputField } from "./MesageInputField";
import { MessageItem } from "./MessageItem";

type MessagePanelProps = {
  messages: MessageType[];
  height: string;
};
export const MessagePanel = ({ messages, height }: MessagePanelProps) => {
  return (
    <div className={`${height}`}>
      <div className="flex h-[93%] flex-col-reverse overflow-y-scroll">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
      <div className="flex h-[7%] flex-none items-center border-t-[1px] border-black/50">
        <MessageInputField />
      </div>
    </div>
  );
};
