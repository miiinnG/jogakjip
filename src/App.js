import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicGroupListPage from './PublicGroupListPage';
import EmptyPublicGroupListPage from './pages/EmptyPublicGroupListPage';
import PrivateGroupAccessPage from './pages/PrivateGroupAccessPage';
import CreateGroupPage from './pages/CreateGroupPage';
import Nav from './Nav';

function App() {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<PublicGroupListPage />} />
                <Route path="/private" element={<PrivateGroupListPage />} />
                <Route path="/empty-public" element={<EmptyPublicGroupListPage />} />
                <Route path="/private-group-access" element={<PrivateGroupAccessPage />} />
                <Route path="/create-group" element={<CreateGroupPage />} />
            </Routes>
        </Router>
    );
}

export default App;