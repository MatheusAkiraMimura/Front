import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Contato from "../Pages/Contato";
import UploadImageComponent from "../Pages/Projetos/UploadImagens";
import Projetos from "../Pages/Projetos";
import MemoryGame from "../Pages/Projetos/Jogos/MemoryGame";
import ProjetoCRUD from "../Pages/Projetos/CRUD";
import { CRUDProvider } from "../Pages/Projetos/CRUD/Contexto";
import { ContatoProvider } from "../Pages/Contato/Contexto";
import { HomeProvider } from "../Pages/Home/Context";
import { UploadImagensProvider } from "../Pages/Projetos/UploadImagens/Context";
import { ProjetosProvider } from "../Pages/Projetos/Context";
import { MemoryGameProvider } from "../Pages/Projetos/Jogos/MemoryGame/Context";
import { CandidateProvider } from "../Pages/Projetos/Candidatos/Context/indext";
import CandidatePage from "../Pages/Projetos/Candidatos";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomeProvider>
              <Home />
            </HomeProvider>
          }
        />

        <Route
          path="/contato"
          element={
            <ContatoProvider>
              <Contato />
            </ContatoProvider>
          }
        />

        <Route
          path="/projetos"
          element={
            <ProjetosProvider>
              <Projetos />
            </ProjetosProvider>
          }
        />

        <Route
          path="/projetos/upload"
          element={
            <UploadImagensProvider>
              <UploadImageComponent />
            </UploadImagensProvider>
          }
        />

        <Route
          path="/projetos/crud"
          element={
            <CRUDProvider>
              <ProjetoCRUD />
            </CRUDProvider>
          }
        />

        <Route
          path="/projetos/Candidatos"
          element={
            <CandidateProvider>
              <CandidatePage />
            </CandidateProvider>
          }
        />

        <Route
          path="/projetos/jogos/memoria"
          element={
            <MemoryGameProvider>
              <MemoryGame />
            </MemoryGameProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
