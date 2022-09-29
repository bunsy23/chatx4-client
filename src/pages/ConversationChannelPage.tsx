import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageEventPayload } from "../utils/types";

import { MessagePanel } from "../components/messages/MessagePanel";
import { MessagePanelHeader } from "../components/messages/MessagePanelHeader";
import { SocketContext } from "../utils/context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchMessagesThunk, setMessages } from "../store/messageSlice";
import { updateConversations } from "../store/conversationSlice";

export const ConversationChannelPage = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const { messages } = useSelector((state: RootState) => state.message);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessagesThunk(conversationId));
  }, [id]);

  useEffect(() => {
    console.log(socket);

    socket.on("connected", () => console.log("Connected"));
    socket.on("onMessage", (payload: MessageEventPayload) => {
      console.log({ payload });
      const { conversation, message } = payload;
      dispatch(setMessages(message));
      dispatch(updateConversations(conversation));
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
