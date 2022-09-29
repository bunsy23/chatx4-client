import { useContext, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { AuthContext } from "../../utils/context/AuthContext";
import { ConversationType } from "../../utils/types";
import { CreateConversationModal } from "../modals/CreateConversationModal";

type Props = {
  conversations: ConversationType[];
};

export const ConversationSidebar = ({ conversations }: Props) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { loading } = useSelector((state: RootState) => state.conversation);

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <aside className="h-screen w-full border-black">
        <header className="sticky top-0 left-0 flex h-[6%] w-full items-center justify-between border-b-[1px] bg-white p-4">
          <span className="text-md font-bold">Conversations</span>
          <IoCreateOutline
            size={24}
            onClick={() => setShowModal(true)}
            className="hover:cursor-pointer"
          />
        </header>
        <section>
          {loading && <div>Loadiing...</div>}
          {!loading && (
            <div className="flex flex-col divide-y border-b-[1px]">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="flex items-center gap-x-2 p-4 hover:cursor-pointer hover:bg-slate-100"
                  onClick={() => navigate(`/conversations/${conversation.id}`)}
                >
                  <div className="h-12 w-12 rounded-full bg-primary"></div>
                  <div>
                    <div className="font-medium">
                      {user?.id === conversation.creator.id
                        ? `${conversation.recipient.firstName} ${conversation.recipient.lastName}`
                        : `${conversation.creator.firstName} ${conversation.creator.lastName}`}
                    </div>
                    <div className="text-xs text-gray-700">
                      {conversation.lastMessageSent
                        ? conversation.lastMessageSent.content
                        : ``}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </aside>
    </>
  );
};
