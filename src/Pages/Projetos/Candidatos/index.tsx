import React, { useContext, useState } from "react";
import { Spinner, Text, VStack } from "@chakra-ui/react";
import { CandidateContext } from "./Context/indext";
import MasterPage from "../../../Components/Layout/Master";

const CandidatePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  // Contexto
  const contexto = useContext(CandidateContext);
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

  const { CandidateNavigation, CandidateTable, CandidateModal } = contexto;

  return (
    <MasterPage
      paginaAtual="projetos"
      setShowModal={setShowModal}
      showModal={showModal}
    >
      <VStack spacing={4}>
        <CandidateNavigation />
        <CandidateTable />
        <CandidateModal />
      </VStack>
    </MasterPage>
  );
};

export default CandidatePage;
