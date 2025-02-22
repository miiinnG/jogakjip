import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout";
import PublicGroupListPage from "../pages/PublicGroupListPage";
import CreateGroupPage from "../pages/CreateGroupPage";
import PrivateGroupListPage from "../pages/PrivateGroupListPage";
import PrivateGroupAccessPage from "../pages/PrivateGroupAccessPage";
import EmptyPublicGroupListPage from "../pages/EmptyPublicGroupListPage";
import "./App.module.css";
import "./App.font.css";
import NotFoundPage from "../pages/NotFoundPage";
import MemoryCreatePage from "../pages/MemoryCreatePage";
import PrivateMemoryAccessPage from "../pages/PrivateMemoryAccessPage";
import MemoryPage from "../pages/MemoryPage";
import GroupInfoPage from "../pages/GroupInfoPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/groups" replace />} />
        <Route path="/groups" element={<PublicGroupListPage />} />
        <Route path="/groups/private" element={<PrivateGroupListPage />} />
        <Route path="/groups/create" element={<CreateGroupPage />} />
        <Route path="/groups/:groupId/access" element={<PrivateGroupAccessPage />} />
        <Route path="/empty-public" element={<EmptyPublicGroupListPage />} />
        <Route path="/groups/:groupId" element={<GroupInfoPage />} />

        <Route
          path="/groups/:groupId/posts/create"
          element={<MemoryCreatePage />}
        />
        <Route
          path="/groups/:groupId/posts/:postId/access"
          element={<PrivateMemoryAccessPage />}
        />
        <Route path="/groups/:groupId/posts/:postId" element={<MemoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
