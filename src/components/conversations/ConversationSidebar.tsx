import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Conversation } from "../../utils/types";
import { CreateConversationModal } from "../modals/CreateConversationModal";

type Props = {
  conversations: Conversation[];
};

export const ConversationSidebar = ({ conversations }: Props) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal}/>}
      <aside className="w-80 border-r-2 border-r-gray-100">
        <header className="sticky top-0 left-0 flex h-16 items-center justify-between border-b-[1px] bg-white p-4">
          <span className="text-md font-bold">Conversations</span>
          <IoCreateOutline
            size={24}
            onClick={() => setShowModal(true)}
            className="hover:cursor-pointer"
          />
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
    </>
  );
};
