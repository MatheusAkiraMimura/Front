// React and React Router
import React, { useContext, useState } from "react";

// Chakra UI components
import {
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";

// Custom components and utilities
import MasterPage from "../../../Components/Layout/Master";
import { CRUDContext } from "./Contexto";

interface FormState {
  nome: string;
  email: string;
  data_campo: string;
  celular: string;
  classificacao: string;
  observacao: string;
  conhecimentos: string[];
  nivel: string;
}

const ProjetoCRUD = () => {
  const [recarregarTabela, setRecarregarTabela] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [terminouEnviar, setTerminouEnviar] = useState(false);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "delete">(
    "create"
  );
  const [idCrud, setIdCrud] = useState("");
  const [forms, setForms] = useState<FormState>({
    nome: "",
    email: "",
    data_campo: "",
    celular: "",
    classificacao: "",
    observacao: "",
    conhecimentos: [],
    nivel: "",
  });

  // Contexto
  const contexto = useContext(CRUDContext);
  if (!contexto) {
    return (
      <VStack>
        <Spinner style={{ width: "105px", height: "105px" }} color="blue.500" />
        <Text mt={3} fontSize="xl">
          Carregando...
        </Text>
      </VStack>
    );
  }

  const {
    NavegacaoCrud,
    ModalCrud,
    TabelaCrud,
  } = contexto;

  return (
    <MasterPage
      paginaAtual="projetos"
      setShowModal={setShowModal}
      showModal={showModal}
      enviandoForm={terminouEnviar}
      setEnviandoForm={setTerminouEnviar}
    >
      <NavegacaoCrud
        setForms={setForms}
        setIsFormModalOpen={setIsFormModalOpen}
        setModalMode={setModalMode}
      />

      <ModalCrud
        forms={forms}
        idCrud={idCrud}
        isFormModalOpen={isFormModalOpen}
        modalMode={modalMode}
        setIsFormModalOpen={setIsFormModalOpen}
        setRecarregarTabela={setRecarregarTabela}
        setShowModal={setShowModal}
      />

      <TabelaCrud
        idCrud={idCrud}
        recarregarTabela={recarregarTabela}
        setForms={setForms}
        setIdCrud={setIdCrud}
        setIsFormModalOpen={setIsFormModalOpen}
        setModalMode={setModalMode}
        setRecarregarTabela={setRecarregarTabela}
        setTerminouEnviar={setTerminouEnviar}
      />
    </MasterPage>
  );
};

export default ProjetoCRUD;
