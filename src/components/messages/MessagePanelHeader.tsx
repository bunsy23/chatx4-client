import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectConversationById } from "../../store/conversationSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import { ConversationType } from "../../utils/types";

export const MessagePanelHeader = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { conversations } = useSelector(
    (state: RootState) => state.conversation
  );

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );

  return (
    <div className="flex h-full flex-none items-center border-b-[1px] border-black/50 pl-4">
      <span className="h-10 w-10 rounded-full bg-red-500" />
      <span className="mx-2 font-bold">
        {user?.id === conversation?.creator.id
          ? `${conversation?.recipient.firstName} ${conversation?.recipient.lastName}`
          : `${conversation?.creator.firstName} ${conversation?.creator.lastName}`}
      </span>
    </div>
  );
};
