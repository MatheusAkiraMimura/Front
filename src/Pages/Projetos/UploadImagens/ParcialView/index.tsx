import React from "react";
import {
  Grid,
  Box,
  Image,
  Button,
  Flex,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";

interface ITabelaImagens {
  imagens: any[];
  onExcluir: (imagemId: any, userId: any) => void;
}

const TabelaImagens = ({ imagens, onExcluir }: ITabelaImagens) => {
  const bgColor = useColorModeValue("white", "gray.700");

  const savedIdentifier = localStorage.getItem("userIdentifier");
  return (
    <>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {imagens.map(
          (imagem, index) =>
            imagem.identificadorUser === savedIdentifier && (
              <Box
                key={index}
                boxShadow="md"
                p="4"
                borderRadius="md"
                bg={bgColor}
                maxW="340px"
              >
                <Flex direction="column" align="center">
                  <Flex justify="end" w="100%" maxW="300px">
                    <Tooltip label="Excluir" aria-label="Excluir">
                      <Button
                        leftIcon={<FaTrashAlt />}
                        colorScheme="red"
                        onClick={() =>
                          onExcluir && onExcluir(imagem.id, imagem.userId)
                        }
                        pl="1.5rem"
                        fontSize="1.4rem"
                      ></Button>
                    </Tooltip>
                  </Flex>

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
    </>
  );
};

export default TabelaImagens;
