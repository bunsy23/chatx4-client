import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { ConversationChannelPage } from "./pages/ConversationChannelPage";
import { ConversationPage } from "./pages/ConversationPage";
import { ConversationPanelPage } from "./pages/ConversationPanelPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AuthContext } from "./utils/context/AuthContext";
import { socket, SocketContext } from "./utils/context/SocketContext";
import { store } from "./store";
import { User } from "./utils/types";

type AppWithProviderProps = {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};

const AppWithProviders = ({
  children,
  user,
  setUser,
}: AppWithProviderProps & PropsWithChildren) => {
  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user: user, updateAuthUser: setUser }}>
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </AuthContext.Provider>
    </ReduxProvider>
  );
};

function App() {
  const [user, setUser] = useState<User>();
  return (
    <AppWithProviders user={user} setUser={setUser}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/conversations" />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="conversations"
            element={
              <AuthenticatedRoute>
                <ConversationPage />
              </AuthenticatedRoute>
            }
          >
            <Route index element={<ConversationPanelPage />} />
            <Route path=":id" element={<ConversationChannelPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppWithProviders>
  );
}

export default App;
