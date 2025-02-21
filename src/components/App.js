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
import MemoryCreatePage from "../pages/MemoryCreatePage";
import PrivateMemoryAccessPage from "../pages/PrivateMemoryAccessPage";
import MemoryPage from "../pages/MemoryPage";
import GroupInfoPage from "../pages/GroupInfoPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/group/public" element={<PublicGroupListPage />} />
        <Route path="/group/private" element={<PrivateGroupListPage />} />
        <Route path="/group/create" element={<CreateGroupPage />} />
        <Route
          path="/group/:groupId/access"
          element={<PrivateGroupAccessPage />}
        />
        <Route path="/empty-public" element={<EmptyPublicGroupListPage />} />
        <Route path="/groups/:groupId" element={<GroupInfoPage />} />


        <Route
          path="/groups/:groupId/posts/create"
          element={<MemoryCreatePage />}
        />
        {/*"/groups/:groupId/posts/create"*/}
        <Route
          path="/groups/posts/:postId/access"
          element={<PrivateMemoryAccessPage />}
        />
        {/*"/groups/:groupId/posts/:postId/access"*/}
        <Route path="/groups/posts/:postId" element={<MemoryPage />} />
        {/*"/groups/:groupId/posts/:postId"*/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
