import React, { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";
import {
  Box,
  VStack,
  Spinner,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
} from "@chakra-ui/react";

interface MasterPageProps {
  children: ReactNode;
  paginaAtual: string;
  setShowModal: (state: boolean) => void;
  showModal: boolean;
  setEnviandoForm?: (state: boolean) => void;
  enviandoForm?: boolean;
}

const MasterPage = ({ children, paginaAtual, showModal }: MasterPageProps) => {
  function vazio() {}

  return (
    <VStack
      minH="100vh"
      flexDirection="column"
      justifyContent="space-between"
      transition="opacity 0.5s ease-out"
      id="topoPagina"
    >
      <Modal isOpen={showModal} onClose={vazio}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex direction="column" align="center" justify="center" p={5}>
              <Spinner size="xl" mb={4} color="blue.500" />
              <Text fontSize="lg" textAlign="center">
                Estamos processando seu formulário. Por favor, aguarde um
                momento.
              </Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Header paginaAtual={paginaAtual} />
      <Box as="main" flex="1" w="100%" mt="4rem">
        {children}
      </Box>
      <Footer />
    </VStack>
  );
};

export default MasterPage;
