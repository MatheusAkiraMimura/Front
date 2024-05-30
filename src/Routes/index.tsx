import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Contato from '../Pages/Contato';





const AppRoutes = () => {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/contato" element={<Contato />} />

            </Routes>
        </Router>
    );
};

export default AppRoutes;
