import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utils/context/AuthContext";

export const MessagePanelHeader = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  return (
    <div className="flex h-full flex-none items-center border-b-[1px] border-black/50 pl-4">
      <span className="h-10 w-10 rounded-full bg-red-500" />
      <span className="mx-2 font-bold">{`${user?.firstName} ${user?.lastName}`}</span>
    </div>
  );
};
