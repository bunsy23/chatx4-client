import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { MessageType } from "../../utils/types";
import { MessageAvatar } from "./MessageAvatar";

type MessageItemProps = {
  message: MessageType;
};

export const MessageItem = ({ message }: MessageItemProps) => {
  const { user } = useContext(AuthContext);

  const isUserMessage = user?.id === message.author.id;

  return (
    <div
      className={`flex items-center gap-x-2 px-4 py-2 ${
        isUserMessage ? "self-end" : ""
      }`}
    >
      <MessageAvatar
        color={user?.id === message.author.id ? "bg-primary" : "bg-green-500"}
      />
      <div
        className={`flex flex-col rounded-2xl border border-black/20 px-8 py-2 ${
          isUserMessage ? "rounded-tr-lg" : "rounded-tl-lg"
        }`}
      >
        <div className="flex items-center gap-x-4">
          <span className="font-semibold">{`${message.author.firstName} ${message.author.lastName}`}</span>
          <span className="text-sm text-gray-700">{`${new Date(
            message.createdAt
          ).toLocaleString()}`}</span>
        </div>
        <div>{message.content}</div>
      </div>
    </div>
  );
};
