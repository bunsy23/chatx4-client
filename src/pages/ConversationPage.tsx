import { Outlet } from "react-router-dom";
import { ConversationSidebar } from "../components/conversations/ConversationSidebar";
import MOCK_CONVERSATIONS from "../__mocks__/conversations";

export const ConversationPage = () => {
  return (
    <div className="grid h-screen grid-cols-12">
      <div className="col-span-2 overflow-y-scroll scrollbar-hide">
        <ConversationSidebar conversations={MOCK_CONVERSATIONS} />
      </div>
      <div className="col-span-10">
        <Outlet />
      </div>
    </div>
  );
};
