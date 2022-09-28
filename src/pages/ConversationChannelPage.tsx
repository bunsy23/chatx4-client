import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConversationMessages } from "../utils/api";
import { MessageEventPayload, MessageType } from "../utils/types";

import { MessagePanel } from "../components/messages/MessagePanel";
import { MessagePanelHeader } from "../components/messages/MessagePanelHeader";
import { SocketContext } from "../utils/context/SocketContext";

export const ConversationChannelPage = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const conversationId = parseInt(id!);
    getConversationMessages(conversationId)
      .then((data) => {
        setMessages(data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    console.log(socket);

    socket.on("connected", () => console.log("Connected"));
    socket.on("onMessage", (payload: MessageEventPayload) => {
      console.log({ payload });
      const { conversation, ...message } = payload;
      setMessages((prev) => [message, ...prev]);
    });

    return () => {
      socket.off("connected", () => console.log("Disconnected"));
      socket.off("onMessage");
    };
  }, []);

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="h-[6%]">
        <MessagePanelHeader />
      </div>
      <div className="h-[94%]">
        <MessagePanel messages={messages} />
      </div>
    </div>
  );
};
