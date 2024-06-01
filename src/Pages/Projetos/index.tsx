import React, { useState } from "react";
import {
  Flex,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import MasterPage from "../../Components/Layout/Master";
import ProjectsGrid from "./ParcialView/Projeto";
import cmcImage from "./Assets/cmc.png";
import memoriaGame from "./Assets/memoria.png";
import projectUpload from "./Assets/projectUpload.png";
import crud from "./Assets/CRUD.png";

import { useNavigate } from "react-router-dom";
import { ITiposOpcoes } from "../../Interfaces";
import MenuOpcoes from "../../Components/MenuOpcoes";
import { BsStarFill } from "react-icons/bs";

const ProjectPage = () => {
  const initialProjects = [
    {
      id: 1,
      titulo: "Jogo da memória",
      dificuldade: "Fácil",
      descricao: "Jogo de memória feito com React, Typescript e Chakra UI",
      imageUrl: memoriaGame,
      link: "/projetos/jogos/memoria",
    },
    {
      id: 2,
      titulo: "Upload e corte de imagem",
      dificuldade: "Fácil",
      descricao:
        "Sistema de upload e corte de imagens utilizando o react-dropzone e react-easy-crop",
      imageUrl: projectUpload,
      link: "/projetos/upload",
    },
    {
      id: 3,
      titulo: "Projeto Gamma Administrativo",
      dificuldade: "Difícil",
      descricao: "Sistema administrativo de Centro médico",
      imageUrl: cmcImage,
      link: "/projetos/",
    },
    {
      id: 4,
      titulo: "CRUD",
      dificuldade: "Médio",
      descricao: "Sistema de gerenciamento de dados via Modals",
      imageUrl: crud,
      link: "/projetos/crud",
    },
  ];

  const [projects] = useState(initialProjects);
  const [difficulty, setDifficulty] = useState("Médio");

  const filteredProjects = projects.filter((project) => {
    return project.dificuldade.includes(difficulty);
  });

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const clicarSaibaMais = (path: any) => {
    navigate(path);
  };

  const handleDifficultySelect = (selectedDifficulty: any) => {
    setDifficulty(selectedDifficulty);
  };

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
        projetos={filteredProjects}
        clicarSaibaMais={clicarSaibaMais}
      />
    </MasterPage>
  );
};

export default ProjectPage;
