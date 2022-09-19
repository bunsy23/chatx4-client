import { Outlet } from "react-router-dom";
import { ConversationSidebar } from "../components/conversations/ConversationSidebar";
import MOCK_CONVERSATIONS from "../__mocks__/conversations";

export const ConversationPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-80 max-w-xs overflow-y-scroll scrollbar-hide">
        <div className="h-full border-r-2 border-r-gray-100">
          <ConversationSidebar conversations={[]} />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
