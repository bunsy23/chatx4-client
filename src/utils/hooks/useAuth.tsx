import { useContext, useEffect, useState } from "react";
import { getAuthUser } from "../api";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { user, updateAuthUser } = useContext(AuthContext);
  const controller = new AbortController();

  useEffect(() => {
    getAuthUser()
      .then(({ data }) => {
        updateAuthUser(data);
        // setTimeout(() => setLoading(false), 1000);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setTimeout(() => setLoading(false), 1000);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { user, loading };
};
