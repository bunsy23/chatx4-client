import { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../utils/context/AuthContext";

export const ConversationChannelPage = () => {
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const params = useParams();
  console.log({ location, params });

  return (
    <div>
      {params.id} - {user && user.email}
    </div>
  );
};
