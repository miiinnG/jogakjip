import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import PublicGroupListPage from "../pages/PublicGroupListPage";
import CreateGroupPage from "../pages/CreateGroupPage";
import PrivateGroupListPage from "../pages/PrivateGroupListPage";
import PrivateGroupAccessPage from "../pages/PrivateGroupAccessPage";
import EmptyPublicGroupListPage from "../pages/EmptyPublicGroupListPage";
import "./App.module.css";
import "./App.font.css";
import NotFoundPage from "../pages/NotFoundPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PublicGroupListPage />} />
        <Route path="/private" element={<PrivateGroupListPage />} />
        <Route path="/create-group" element={<CreateGroupPage />} />
        <Route path="/private-group-access" element={<PrivateGroupAccessPage />} />
        <Route path="/empty-public" element={<EmptyPublicGroupListPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
