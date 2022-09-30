import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { MessagePanel } from "../components/messages/MessagePanel";
import { MessagePanelHeader } from "../components/messages/MessagePanelHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchMessagesThunk } from "../store/messageSlice";

export const ConversationChannelPage = () => {
  const { id } = useParams();
  const { messages } = useSelector((state: RootState) => state.message);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessagesThunk(conversationId));
  }, [id]);

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
