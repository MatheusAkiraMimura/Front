import { FunctionComponent, createContext, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import {
  Flex,
  IconButton,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Coluna } from "../../../Interfaces/tabela";

//#region Interfaces
interface IRetornoPadraoTabela {
  dados: any;
}

interface IRetornoBotoesAlterarDeletar {
  id: string;
  abriModalAlterar?: (idSelecionado: any) => void; 
  abrirModalDeletar?: (idSelecionado: any) => void; 
}

interface TabelaCabecalhoProps {
  colunas: Coluna[];
}

interface ILinhasDaTabela {
  colunas: Coluna[];
  linhas: any[];
  nomeTabela?: string;
  linhaDestaque?: string;
  navigate: NavigateFunction;
  abriModalAlterar?: (idSelecionado: any) => void;
  abrirModalDeletar?: (idSelecionado: any) => void;
}
//#endregion

//#region types
type HandleConsultaPlanta_inicio = (valor: string) => Promise<void>;

//#endregion types

//#region interface de Context type
interface TabelaCustomizadaContextType {
  TabelaCabecalho: FunctionComponent<TabelaCabecalhoProps>;
  LinhasDaTabela: FunctionComponent<ILinhasDaTabela>;
}
//#endregion interface de Context type

export const TabelaCustomizadaContext =
  createContext<TabelaCustomizadaContextType | null>(null);

export const TabelaCustomizadaProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  //#region ParcialView
  const TabelaCabecalho = ({ colunas }: TabelaCabecalhoProps) => {
    const bgHeader = useColorModeValue("teal.200", "teal.200");
    const colorTh = useColorModeValue("gray.700", "black");
    
    return (
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
    );
  };

  const renderizarLinha = (
    coluna: Coluna,
    linha: any,
    navigate: NavigateFunction,
    abriModalAlterar?: (idSelecionado: any) => void,
    abrirModalDeletar?: (idSelecionado: any) => void
  ) => {
    
    const RenderizarPadraoTabela = ({ dados }: IRetornoPadraoTabela) => (
      <>{dados}</>
    );

    const RenderizarBotaoDetalhes = ({
      id,
      abriModalAlterar,
      abrirModalDeletar,
    }: IRetornoBotoesAlterarDeletar) => {
      return (
        <Flex>
          <Tooltip label="Alterar" placement="top">
            <IconButton
              aria-label="Alterar"
              icon={<FaEdit fontSize="1.5rem" />}
              onClick={
                abriModalAlterar ? () => abriModalAlterar(id) : undefined
              }
              size="md"
              mx=".2rem"
              my=".2rem"
              colorScheme="blue"
            />
          </Tooltip>

          <Tooltip label="Apagar" placement="top">
            <IconButton
              aria-label="Apagar"
              icon={<FaTrash fontSize="1.3rem" />}
              onClick={
                abrirModalDeletar ? () => abrirModalDeletar(id) : undefined
              }
              size="md"
              mx=".2rem"
              my=".2rem"
              colorScheme="red"
            />
          </Tooltip>
        </Flex>
      );
    };

    const RenderizarChekbox = ({ dados }: IRetornoPadraoTabela) => {
      // Transforma a string em um array, separando pelos pontos onde há vírgulas
      const checkboxArray = dados.split(",");

      return (
        <>
          {checkboxArray.map((checkbox: any, index: any) => (
            <Text key={index} pb=".2rem">
              {checkbox}
            </Text> // Renderiza cada checkbox em uma linha separada
          ))}
        </>
      );
    };

    switch (coluna.chave) {
      case "botoesAlterarDeletar":
        return RenderizarBotaoDetalhes({
          ...(linha[coluna.chave] as IRetornoBotoesAlterarDeletar),
          abriModalAlterar,
          abrirModalDeletar,
        });

      case "conhecimentos":
        return RenderizarChekbox(linha[coluna.chave] as IRetornoPadraoTabela);

      default:
        return RenderizarPadraoTabela(
          linha[coluna.chave] as IRetornoPadraoTabela
        );
    }
  };

  const LinhasDaTabela = ({
    colunas,
    linhas,
    nomeTabela,
    linhaDestaque,
    navigate,
    abriModalAlterar,
    abrirModalDeletar,
  }: ILinhasDaTabela) => {
    const bgLinhas = useColorModeValue(
      "white",
      "var(--chakra-colors-gray-700)"
    );
    const bgLinhaDestaque = useColorModeValue(
      "var(--chakra-colors-gray-200)",
      "var(--chakra-colors-gray-500)"
    );

    return (
      <Tbody fontSize="sm" bg={bgLinhas}>
        {linhas.map((linha, index) => {
          return (
            <Tr
              key={`${index}-${nomeTabela}`}
              id={`linha-${index}-${nomeTabela}`}
            >
              {colunas.map((coluna, colunaIndex) => (
                <Td
                  key={`${coluna}-${colunaIndex}`}
                  py=".8rem"
                  background={
                    linha.id.dados == linhaDestaque ? bgLinhaDestaque : ""
                  }
                >
                  {renderizarLinha(
                    coluna,
                    linha,
                    navigate,
                    abriModalAlterar,
                    abrirModalDeletar
                  )}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    );
  };

  //#endregion

  return (
    <TabelaCustomizadaContext.Provider
      value={{
        TabelaCabecalho,
        LinhasDaTabela,
      }}
    >
      {children}
    </TabelaCustomizadaContext.Provider>
  );
};
/* Fim do Contexto */
