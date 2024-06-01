import React, { useState, useEffect, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import {
  Box,
  Button,
  Text,
  Image,
  Flex,
  useBreakpointValue,
  useColorModeValue,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  useToast,
  Heading,
  IconButton,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MasterPage from "../../../Components/Layout/Master";
import {
  BDDeleteImagem,
  BDImagens,
  BDUploadImagem,
} from "../../../Api/bancoDados";
import NavEntreProjetos from "../ParcialView/NavEntreProjetos";
import { UploadImagensContext } from "./Context";

interface Imagem {
  id: number;
  userId: number;
  caminhoDaImagem: string;
}

const UploadImageComponent = () => {
  const toast = useToast();
  const [imagens, setImagens] = useState<Imagem[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");

  const savedIdentifier = localStorage.getItem("userIdentifier");

  useEffect(() => {
    if (savedIdentifier) {
      const [savedName] = savedIdentifier.split("-");
      setUserName(savedName);
    }
  }, []);


  // Contexto
  const contexto = useContext(UploadImagensContext);
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
   EtapasUpload,
   TabelaImagens,
   onExcluir
  } = contexto;


  return (
    <MasterPage
      paginaAtual="projetos"
      setShowModal={setShowModal}
      showModal={showModal}
    >
      <>
        <NavEntreProjetos
          rota="projetos"
          textoIconButton="Voltar para Projetos"
          textoButton="Projetos"
        >
          <Heading ml={8} size="lg">
            Upload e Delete de Imagens
            <Text fontSize="1.6rem" align="center" >{userName}</Text>
          </Heading>
        </NavEntreProjetos>

        <EtapasUpload setImagens={setImagens} />

        <Box p={4} maxW="75rem" m="0 auto" mt={10}>
          <TabelaImagens imagens={imagens} onExcluir={onExcluir} setImagens={setImagens} />
        </Box>
      </>
    </MasterPage>
  );
};

export default UploadImageComponent;
