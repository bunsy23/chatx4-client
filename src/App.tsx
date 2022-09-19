import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { ConversationChannelPage } from "./pages/ConversationChannelPage";
import { ConversationPage } from "./pages/ConversationPage";
import { ConversationPanelPage } from "./pages/ConversationPanelPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AuthContext } from "./utils/context/AuthContext";
import { User } from "./utils/types";

function App() {
  const [user, setUser] = useState<User>();
  return (
    <AuthContext.Provider value={{ user: user, updateAuthUser: setUser }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/conversations" />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="conversations" element={<ConversationPage />}>
            <Route
              index
              element={
                <AuthenticatedRoute>
                  <ConversationPanelPage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <AuthenticatedRoute>
                  <ConversationChannelPage />
                </AuthenticatedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
