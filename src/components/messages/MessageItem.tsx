import { formatRelative, subDays } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { MessageType } from "../../utils/types";
import { MessageAvatar } from "./MessageAvatar";

type MessageItemProps = {
  message: MessageType;
  showAvatar: boolean;
};

export const MessageItem = ({ message, showAvatar }: MessageItemProps) => {
  const { user } = useContext(AuthContext);

  const isUserMessage = user?.id === message.author.id;

  const messageDate = new Date(message.createdAt);
  const displayMessageDate = formatRelative(messageDate, new Date());

  return (
    <div
      className={`flex items-center  gap-x-2 px-4 ${
        showAvatar ? "py-2 pt-[0.1rem]" : "py-[0.1rem]"
      } ${isUserMessage ? "self-end" : ""}`}
    >
      {!isUserMessage ? (
        !showAvatar ? (
          <MessageAvatar color="bg-none" />
        ) : (
          <MessageAvatar color="bg-green-500" />
        )
      ) : null}

      <div
        className={`flex max-w-sm flex-col rounded-2xl border border-black/20 px-8 py-2 ${
          isUserMessage
            ? !showAvatar
              ? "rounded-br-lg"
              : "rounded-tr-lg"
            : !showAvatar
            ? "rounded-bl-lg"
            : "rounded-tl-lg"
        }`}
      >
        <div className={`flex ${isUserMessage ? "justify-end" : null}`}>
          <div className="flex items-center gap-x-4">
            <span className="text-sm font-semibold">{`${message.author.firstName} ${message.author.lastName}`}</span>
            <span className="text-xs font-semibold text-gray-700">
              {displayMessageDate}
            </span>
          </div>
        </div>
        <div className="text-sm">{message.content}</div>
      </div>
    </div>
  );
};
