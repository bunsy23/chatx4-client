import { formatRelative, subDays } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { MessageType } from "../../utils/types";
import { MessageAvatar } from "./MessageAvatar";

type MessageItemProps = {
  message: MessageType;
  sameAuthor: boolean;
};

export const MessageItem = ({ message, sameAuthor }: MessageItemProps) => {
  const { user } = useContext(AuthContext);

  const isUserMessage = user?.id === message.author.id;

  const messageDate = new Date(message.createdAt);
  const displayMessageDate = formatRelative(messageDate, new Date());

  return (
    <div
      className={`flex items-center gap-x-2 px-4 py-2 ${
        isUserMessage ? "self-end" : ""
      }`}
    >
      {!isUserMessage ? (
        !sameAuthor ? (
          <MessageAvatar color="bg-none" />
        ) : (
          <MessageAvatar color="bg-green-500" />
        )
      ) : null}

      <div
        className={`flex flex-col rounded-2xl border border-black/20 px-8 py-2 ${
          isUserMessage
            ? !sameAuthor
              ? "rounded-br-lg"
              : "rounded-tr-lg"
            : !sameAuthor
            ? "rounded-bl-lg"
            : "rounded-tl-lg"
        }`}
      >
        <div className="flex justify-end">
          <div className="flex items-center gap-x-4">
            <span className="font-semibold">{`${message.author.firstName} ${message.author.lastName}`}</span>
            <span className="text-xs font-semibold text-gray-700">
              {displayMessageDate}
            </span>
          </div>
        </div>
        <div>{message.content}</div>
      </div>
    </div>
  );
};
