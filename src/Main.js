import { Route, Routes } from 'react-router-dom';
import PublicGroupListPage from './pages/PublicGroupListPage';

function Main() {
    return (
        <Routes>
            <Route path="/" element={<PublicGroupListPage />} />
        </Routes>
    );
}

export default Main;