import React, { useContext, useState } from "react";
import {
  Flex,
  useColorModeValue,
  Box,
  VStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import MasterPage from "../../Components/Layout/Master";


import { ITiposOpcoes } from "../../Interfaces";
import MenuOpcoes from "../../Components/MenuOpcoes";
import { BsStarFill } from "react-icons/bs";
import { ProjetosContext } from "./Context";

const ProjectPage = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleDifficultySelect = (selectedDifficulty: any) => {
    setDifficulty(selectedDifficulty);
  };

  const [difficulty, setDifficulty] = useState("Médio");

  const bgGradientEasy = useColorModeValue(
    "linear-gradient(to right, #00c855, #008b46)",
    "linear-gradient(to right, #59ff92, #00ec62)"
  );
  const bgGradientIntermediate = useColorModeValue(
    "linear-gradient(to right, #ff6f00, #c44100)",
    "linear-gradient(to right, #ffb73a, #fa7e16)"
  );
  const bgGradientHard = useColorModeValue(
    "linear-gradient(to right, #ff3737, #cf0000)",
    "linear-gradient(to right, #ff6161, #ff1818)"
  );

  const textColor = useColorModeValue("white", "gray.800");
  const iconColor = useColorModeValue("white", "gray.800");

  const opcoes: ITiposOpcoes[] = [
    {
      titulo: "Iniciante",
      iconCount: 1,
      bgGradientEnabled: bgGradientEasy,
      textColorEnabled: textColor,
      iconColorEnabled: iconColor,
      value: "Fácil",
    },
    {
      titulo: "Intermediário",
      iconCount: 3,
      bgGradientEnabled: bgGradientIntermediate,
      textColorEnabled: textColor,
      iconColorEnabled: iconColor,
      value: "Médio",
    },
    {
      titulo: "Avançado",
      iconCount: 5,
      bgGradientEnabled: bgGradientHard,
      textColorEnabled: textColor,
      iconColorEnabled: iconColor,
      value: "Difícil",
    },
  ];

  const bgColor = useColorModeValue("gray.300", "gray.500");

    // Contexto
    const contexto = useContext(ProjetosContext);
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
      ProjectsGrid
    } = contexto;
  return (
    <MasterPage
      paginaAtual="projetos"
      setShowModal={setShowModal}
      showModal={showModal}
    >
      <Box bgColor={bgColor}>
        <Flex direction="column" p={4} maxW="100rem" m="0 auto">
          <MenuOpcoes
            opcoes={opcoes}
            tituloTooltip="Projetos de nível"
            aoselecionarOpcao={handleDifficultySelect}
            icone={({ color }) => <BsStarFill color={color} size="20px" />}
          />
        </Flex>
      </Box>

      <ProjectsGrid
        difficulty={difficulty}
      />
    </MasterPage>
  );
};

export default ProjectPage;
