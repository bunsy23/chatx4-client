import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConversationChannelPage } from "./pages/ConversationChannelPage";
import { ConversationPage } from "./pages/ConversationPage";
import { ConversationPanelPage } from "./pages/ConversationPanelPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="conversations" element={<ConversationPage />}>
          <Route index element={<ConversationPanelPage />} />
          <Route path=":id" element={<ConversationChannelPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
