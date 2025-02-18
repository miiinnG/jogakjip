import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

function Main() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default Main;