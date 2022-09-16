import { useLocation, useParams } from "react-router-dom";

export const ConversationChannelPage = () => {
  const location = useLocation();
  const params = useParams();
  console.log({ location, params });

  return <div>{params.id}</div>;
};
