import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ConversationSidebar } from "../components/conversations/ConversationSidebar";
import { getConversations } from "../utils/api";
import { ConversationType } from "../utils/types";

export const ConversationPage = () => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  useEffect(() => {
    getConversations()
      .then(({ data }) => {
        setConversations(data);
      })
      .catch((err) => console.log(err));
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
