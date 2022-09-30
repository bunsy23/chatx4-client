import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ConversationSidebar } from "../components/conversations/ConversationSidebar";
import { AppDispatch, RootState } from "../store";
import {
  addConversation,
  fetchConversationsThunk,
  updateConversations,
} from "../store/conversationSlice";
import { setMessages } from "../store/messageSlice";
import { SocketContext } from "../utils/context/SocketContext";
import { ConversationType, MessageEventPayload } from "../utils/types";

export const ConversationPage = () => {
  const { conversations } = useSelector(
    (state: RootState) => state.conversation
  );
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(fetchConversationsThunk());
  }, []);

  useEffect(() => {
    console.log(socket);

    socket.on("connected", () => {
      console.log("Connected");
    });
    socket.on("onMessage", (payload: MessageEventPayload) => {
      console.log("onMessage", { payload });
      const { conversation, message } = payload;
      dispatch(setMessages(message));
      dispatch(updateConversations(conversation));
    });
    socket.on("onConversation", (payload: ConversationType) => {
      console.log("onConversation", { payload });
      dispatch(addConversation(payload));
    });

    return () => {
      socket.off("connected", () => console.log("Disconnected"));
      socket.off("onMessage");
      socket.off("onConversation");
    };
  }, []);

  return (
    <div className="flex">
      <div className="w-80">
        <div className="overflow-y-scroll border-r-[1px] border-black/50 scrollbar-hide">
          <ConversationSidebar conversations={conversations} />
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};
