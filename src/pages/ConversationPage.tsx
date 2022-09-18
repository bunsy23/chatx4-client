import { Outlet } from "react-router-dom";
import { ConversationSidebar } from "../components/conversations/ConversationSidebar";
import MOCK_CONVERSATIONS from "../__mocks__/conversations";

export const ConversationPage = () => {
  return (
    <div className="flex h-screen">
      <div className="max-w-xs overflow-y-scroll scrollbar-hide">
        <ConversationSidebar conversations={MOCK_CONVERSATIONS} />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
