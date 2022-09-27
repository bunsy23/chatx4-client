import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConversationMessages } from "../utils/api";
import { MessageType } from "../utils/types";

import { MessagePanel } from "../components/messages/MessagePanel";
import { MessagePanelHeader } from "../components/messages/MessagePanelHeader";

export const ConversationChannelPage = () => {
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
      <MessagePanelHeader />
      <MessagePanel messages={messages} height="h-full" />
    </div>
  );
};
