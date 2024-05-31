import React, { useContext } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
  Text,
  useColorModeValue,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { Coluna } from "../../Interfaces";
import { NavigateFunction } from "react-router-dom";
import { TabelaCustomizadaContext, TabelaCustomizadaProvider } from "./Contexto";

interface TabelaCustomizadaProps {
  colunas: Coluna[];
  linhas: any[];
  nomeTabela?: string;
  linhaDestaque?: string;
  navigate: NavigateFunction;
  abriModalAlterar?: (idSelecionado: any) => void;
  abrirModalDeletar?: (idSelecionado: any) => void;
}

const TabelaCustomizada = ({
  colunas,
  linhas,
  nomeTabela,
  linhaDestaque,
  navigate,
  abriModalAlterar,
  abrirModalDeletar,
}: TabelaCustomizadaProps) => {
  const bgHeader = useColorModeValue("teal.200", "teal.200");
  const colorTh = useColorModeValue("gray.700", "black");
  const bgLinhas = useColorModeValue("white", "var(--chakra-colors-gray-700)");

  // Contexto
  const contexto = useContext(TabelaCustomizadaContext);
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
    TabelaCabecalho,
    LinhasDaTabela,
  } = contexto;

  if (linhas.length === 0) {
    return (
      <Box
        overflowX="auto"
        boxShadow="lg"
        borderRadius="md"
        bg="white"
        mb={6}
        mx={1}
      >
        <Table variant="simple" size="md">
          <Thead bg={bgHeader}>
            <Tr>
              {colunas.map((coluna, index) => (
                <Th
                  key={`${coluna.titulo}-${index}`}
                  color={colorTh}
                  borderColor="gray.200"
                >
                  <b>{coluna.titulo}</b>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td colSpan={colunas.length}>Nada encontrado</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    );
  }

  return (
    <Box
      overflowX="auto"
      boxShadow="lg"
      borderRadius="md"
      bg="white"
      mb={6}
      mx={1}
    >
      <Table variant="simple" size="md">
        <TabelaCabecalho colunas={colunas}/>

        <LinhasDaTabela
          colunas={colunas}
          linhas={linhas}
          nomeTabela={nomeTabela}
          navigate={navigate}
          linhaDestaque={linhaDestaque}
          abriModalAlterar={abriModalAlterar}
          abrirModalDeletar={abrirModalDeletar}
        />
      </Table>
    </Box>
  );
};

export const TabelaCustomizadaComProvider: React.FC<TabelaCustomizadaProps> = ({
  colunas,
  linhas,
  nomeTabela,
  linhaDestaque,
  navigate,
  abriModalAlterar,
  abrirModalDeletar,
}) => {
  return (
    <TabelaCustomizadaProvider>
      <TabelaCustomizada
        colunas={colunas}
        linhas={linhas}
        navigate={navigate}
        abriModalAlterar={abriModalAlterar}
        abrirModalDeletar={abrirModalDeletar}
        linhaDestaque={linhaDestaque}
        nomeTabela={nomeTabela}
      />
    </TabelaCustomizadaProvider>
  );
};
