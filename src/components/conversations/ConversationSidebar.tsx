import { IoCreateOutline } from "react-icons/io5";
import { Conversation } from "../../utils/types";

type Props = {
  conversations: Conversation[];
};

export const ConversationSidebar = ({ conversations }: Props) => {
  return (
    <aside className="border-r-2 border-r-gray-100">
      <header className="sticky top-0 left-0 flex h-16 items-center justify-between border-b-[1px] bg-white p-4">
        <span className="text-md font-bold">Conversations</span>
        <IoCreateOutline size={24} />
      </header>
      <div className="">
        <div className="flex flex-col divide-y">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="flex items-center gap-x-2 p-4"
            >
              <div className="h-12 w-12 rounded-full bg-primary"></div>
              <div>
                <div className="font-medium">{conversation.name}</div>
                <div className="text-sm text-gray-700">
                  {conversation.lastMessage}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
