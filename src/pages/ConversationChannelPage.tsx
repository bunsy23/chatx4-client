import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getConversationMessages } from "../utils/api";
import { AuthContext } from "../utils/context/AuthContext";
import { MessageType } from "../utils/types";

import { MessagePanel } from "../components/messages/MessagePanel";

export const ConversationChannelPage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const conversationId = parseInt(id!);
    getConversationMessages(conversationId)
      .then((data) => {
        console.log(data.data);
        setMessages(data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex h-[7%] flex-none items-center border-b-[1px] border-black/50 pl-4">
        <span className="h-10 w-10 rounded-full bg-red-500" />
        <span className="mx-2 font-bold">{`${user?.firstName} ${user?.lastName}`}</span>
      </div>

      <MessagePanel messages={messages} height="h-[93%]" />
    </div>
  );
};
