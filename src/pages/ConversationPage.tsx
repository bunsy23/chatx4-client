import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ConversationSidebar } from "../components/conversations/ConversationSidebar";
import { AppDispatch, RootState } from "../store";
import { fetchConversationsThunk } from "../store/conversationSlice";

export const ConversationPage = () => {
  const { conversations } = useSelector(
    (state: RootState) => state.conversation
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchConversationsThunk());
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
