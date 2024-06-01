import React, { useContext, useState } from "react";
import {
  Flex,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import MasterPage from "../../Components/Layout/Master";

import { ContatoContext } from "./Contexto";

const Contato = () => {
  const [showModal, setShowModal] = useState(false);

  // Contexto
  const contexto = useContext(ContatoContext);
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

  const { InformacoesAkira, ChatConversa } = contexto;

  return (
    <MasterPage
      paginaAtual="contato"
      setShowModal={setShowModal}
      showModal={showModal}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        p={6}
        maxW="80rem"
        w="100%"
        m="4rem auto"
      >
        <InformacoesAkira />

        <ChatConversa />
      </Flex>
    </MasterPage>
  );
};

export default Contato;
