import {
  Box,
  Button,
  ChakraProvider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import AppRoutes from "./Routes";
import customTheme from "./Assets/Styles/theme";
import { useEffect, useState } from "react";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");

  useEffect(() => {
    const savedIdentifier = localStorage.getItem("userIdentifier");
    if (!savedIdentifier) {
      onOpen();
    }
  }, [onOpen]);

  const handleSave = () => {
    const timestamp = new Date().toISOString();
    const newIdentifier = `${name}-${timestamp}`;
    localStorage.setItem("userIdentifier", newIdentifier);
    setIdentifier(newIdentifier);
    window.location.reload();
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Box p={4}>
        <Modal isOpen={isOpen} onClose={() => {}} isCentered >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Digite seu nome</ModalHeader>
            <ModalCloseButton disabled />
            <ModalBody>
              <Input
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleSave}
                isDisabled={!name.trim()}
              >
                Enviar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      <AppRoutes />
    </ChakraProvider>
  );
};

export default App;
