import React, { useState } from "react";
import {
  Grid,
  Box,
  Image,
  Button,
  Flex,
  useColorModeValue,
  Tooltip,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight, FaTrashAlt } from "react-icons/fa";

interface ITabelaImagens {
  imagens: any[];
  onExcluir: (imagemId: any, userId: any) => void;
}

const TabelaImagens = ({ imagens, onExcluir }: ITabelaImagens) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const albumBgColor = useColorModeValue("gray.100", "gray.800");

  const savedIdentifier = localStorage.getItem("userIdentifier");

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(imagens.length / itemsPerPage);

  const paginatedImagens = imagens.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const imagensFiltradas = paginatedImagens.filter(
    (imagem) => imagem.identificadorUser === savedIdentifier
  );

  return imagensFiltradas.length > 0 ? (
    <>
      <Box
        p={5}
        borderRadius="md"
        boxShadow="lg"
        bg={albumBgColor}
        maxW="1200px"
        mx="auto"
      >
        <Heading as="h2" size="lg" mb={5} textAlign="center">
          Álbum de Fotos
        </Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {paginatedImagens.map(
            (imagem, index) =>
              imagem.identificadorUser === savedIdentifier && (
                <Box
                  key={index}
                  boxShadow="md"
                  p="4"
                  borderRadius="md"
                  bg={bgColor}
                  maxW="340px"
                  position="relative"
                >
                  <Flex direction="column" align="center">
                    <Tooltip label="Excluir" aria-label="Excluir">
                      <Button
                        leftIcon={<FaTrashAlt />}
                        colorScheme="red"
                        onClick={() =>
                          onExcluir && onExcluir(imagem.id, imagem.userId)
                        }
                        pl="1.5rem"
                        fontSize="1.4rem"
                        position="absolute"
                        top="10px"
                        right="10px"
                        opacity={0.6}
                        _hover={{ opacity: 1 }}
                        transition="opacity 0.2s"
                      />
                    </Tooltip>

                    <Image
                      src={`http://127.0.0.1:8000/storage/images/${imagem.caminho_da_imagem}`}
                      alt={`Imagem ${index}`}
                      boxSize="300px"
                      objectFit="cover"
                      mt={1}
                    />
                  </Flex>
                </Box>
              )
          )}
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
  ) : (
    <></>
  );
};

export default TabelaImagens;
