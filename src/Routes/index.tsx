import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Contato from "../Pages/Contato";
import UploadImageComponent from "../Pages/Projetos/UploadImagens";
import Projetos from "../Pages/Projetos";
import MemoryGame from "../Pages/Projetos/Jogos/MemoryGame";
import ProjetoCRUD from "../Pages/Projetos/CRUD";
import { CRUDProvider } from "../Pages/Projetos/CRUD/Contexto";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/contato" element={<Contato />} />

        <Route path="/projetos" element={<Projetos />} />

        <Route path="/projetos/upload" element={<UploadImageComponent />} />

        <Route
          path="/projetos/crud"
          element={
            <CRUDProvider>
              <ProjetoCRUD />
            </CRUDProvider>
          }
        />

        <Route path="/projetos/jogos/memoria" element={<MemoryGame />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
