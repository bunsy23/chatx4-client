import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { ConversationChannelPage } from "./pages/ConversationChannelPage";
import { ConversationPage } from "./pages/ConversationPage";
import { ConversationPanelPage } from "./pages/ConversationPanelPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AuthContext } from "./utils/context/AuthContext";
import { socket, SocketContext } from "./utils/context/SocketContext";
import { User } from "./utils/types";

function App() {
  const [user, setUser] = useState<User>();
  return (
    <AuthContext.Provider value={{ user: user, updateAuthUser: setUser }}>
      <SocketContext.Provider value={socket}>
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
      </SocketContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
