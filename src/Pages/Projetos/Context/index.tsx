import { FunctionComponent, createContext, useEffect, useState } from "react";

import { NavigateFunction, useNavigate } from "react-router-dom";

// Chakra UI components
import {
  useToast,
  UseToastOptions,
  ToastId,
  Box,
  useColorModeValue,
  Grid,
  GridItem,
  LinkBox,
  Spinner,
  Image,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  useBreakpointValue,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { SetFunction } from "../../../Interfaces";

import cmcImage from "../Assets/cmc.png";
import memoriaGame from "../Assets/memoria.png";
import projectUpload from "../Assets/projectUpload.png";
import crud from "../Assets/CRUD.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
//#region Interfaces
interface IInformacoesAkira {}

interface IProjeto {
  id: number;
  titulo: string;
  descricao: string;
  dificuldade: string;
  imageUrl: string;
  link: string;
}

interface IProjetosGrid {
  difficulty: string;
}
//#endregion

//#region types
type BuscarDadosCrudByUser = (
  id: any,
  setForms: SetFunction<any>,
  setIsFormModalOpen: SetFunction<boolean>
) => Promise<void>;

//#endregion types

//#region interface de Context type
interface ProjetosContextType {
  navigate: NavigateFunction;

  toast: (options?: UseToastOptions) => ToastId;

  savedIdentifier: string | null;

  isLoading: boolean;
  setIsLoading: SetFunction<boolean>;

  ProjectsGrid: FunctionComponent<IProjetosGrid>;
}
//#endregion interface de Context type

export const ProjetosContext = createContext<ProjetosContextType | null>(null);

export const ProjetosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //#region do navigate
  const navigate = useNavigate();
  //#endregion

  //#region do useToast
  const toast = useToast();
  //#endregion

  //#region do Auth
  const savedIdentifier = localStorage.getItem("userIdentifier");
  //#endregion

  //#region de modal de loading
  const [isLoading, setIsLoading] = useState(false);
  //#endregion

  //#region JSONs
  //#endregion

  //#region Tratamentos
  //#endregion

  //#region funções da index de Contato
  //#endregion

  //#region ParcialView
  const ProjectsGrid: React.FC<{ difficulty: string }> = ({ difficulty }) => {
    const [selectedProjeto, setSelectedProjeto] = useState<number | null>(0);
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const overlayBgColor = useColorModeValue(
      "rgba(255, 255, 255, 0.9)",
      "rgba(0, 0, 0, 0.8)"
    );
    const bordaColor = useColorModeValue("gray.200", "gray.700");

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

    const filteredProjects = projects.filter((project) =>
      project.dificuldade.includes(difficulty)
    );

    const clicarSaibaMais = (path: any) => {
      navigate(path);
    };

    // Definir itemsPerPage com base no tamanho da tela
    const itemsPerPage = useBreakpointValue({ base: 1, xl: 3 });

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredProjects.length / (itemsPerPage || 1));

    const paginatedProjetos = filteredProjects.slice(
      (currentPage - 1) * (itemsPerPage || 1),
      currentPage * (itemsPerPage || 1)
    );

    useEffect(() => {
      if (currentPage > totalPages) {
        setCurrentPage(1);
      }
    }, [filteredProjects, currentPage, totalPages]);

    useEffect(() => {
      setIsLoading(true);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        <Box>
          <Modal isOpen={isLoading} onClose={() => {}} isCentered>
            <ModalOverlay />
            <ModalContent
              bg="transparent"
              boxShadow="none"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner size="xl" color="blue.500" />
            </ModalContent>
          </Modal>
          <Grid
            templateColumns={{
              base: "repeat(auto-fill, minmax(16rem, 1fr))",
              sm: "repeat(auto-fill, minmax(22rem, 1fr))",
              md: "repeat(auto-fill, minmax(35rem, 1fr))",
            }}
            gap={{ base: 6, md: 12 }}
            p={6}
            maxW="100rem"
            justifyContent="center"
            m="0 auto"
          >
            {paginatedProjetos.map((projeto, index) => (
              <GridItem
                w="100%"
                maxW="40rem"
                key={`${projeto.titulo}-${index}`}
                m="0 auto"
              >
                <LinkBox
                  cursor="pointer"
                  boxShadow="2xl"
                  _hover={{ boxShadow: "dark-lg" }}
                  position="relative"
                  border="1px"
                  borderRadius="lg"
                  borderColor={bordaColor}
                  overflow="hidden"
                >
                  <Image src={projeto.imageUrl} alt={projeto.titulo} />
                  {selectedProjeto === index && (
                    <Box
                      position="absolute"
                      bottom="0"
                      left="0"
                      right="0"
                      bg={overlayBgColor}
                      p="4"
                      onClick={() => setSelectedProjeto(null)}
                      textAlign="center"
                      zIndex={999}
                    >
                      <Text fontSize="lg" fontWeight="bold">
                        {projeto.titulo}
                      </Text>
                      <Text>{projeto.descricao}</Text>
                      <Button
                        colorScheme="purple"
                        mt="3"
                        onClick={() => clicarSaibaMais(projeto.link)}
                      >
                        Saiba mais
                      </Button>
                    </Box>
                  )}
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    onClick={() => setSelectedProjeto(index)}
                    zIndex={998}
                  ></Box>
                </LinkBox>
              </GridItem>
            ))}
          </Grid>
        </Box>

        <Flex justify="center" mt={4}>
          <IconButton
            icon={<FaArrowLeft />}
            isDisabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            aria-label="Página Anterior"
          />

          <Text mx={4}>{`${currentPage} de ${totalPages}`}</Text>

          <IconButton
            icon={<FaArrowRight />}
            isDisabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            aria-label="Próxima Página"
          />
        </Flex>
      </>
    );
  };

  //#endregion

  return (
    <ProjetosContext.Provider
      value={{
        navigate,

        toast,

        savedIdentifier,

        isLoading,
        setIsLoading,

        ProjectsGrid,
      }}
    >
      {children}
    </ProjetosContext.Provider>
  );
};
/* Fim do Contexto */
