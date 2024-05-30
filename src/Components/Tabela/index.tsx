import React from 'react';
import { Table, Thead, Tbody, Tr, Td, Th, Box, Text, useColorModeValue } from '@chakra-ui/react';
import { TabelaCabecalho } from './TabelaCabecalho';
import { LinhasDaTabela } from './LinhasTabela';
import { Coluna } from '../../Interfaces';
import { NavigateFunction } from 'react-router-dom';

interface TabelaCustomizadaProps {
    colunas: Coluna[];
    linhas: any[];
    nomeTabela?: string;
    linhaDestaque?: string;
    navigate: NavigateFunction;
    abriModalAlterar?: (idSelecionado: any) => void
    abrirModalDeletar?: (idSelecionado: any) => void
    abrirModalValidarSenha?: (idSelecionado: any) => void
}

export const TabelaCustomizada = ({ colunas, linhas, nomeTabela, linhaDestaque, navigate, abriModalAlterar, abrirModalDeletar, abrirModalValidarSenha }: TabelaCustomizadaProps) => {
    const bgHeader = useColorModeValue('teal.200', 'teal.200');
    const colorTh = useColorModeValue('gray.700', 'black');
    const bgLinhas = useColorModeValue('white', 'var(--chakra-colors-gray-700)')

    if (linhas.length === 0) {
        return (
            <Box overflowX="auto" boxShadow="lg" borderRadius="md" bg="white" mb={6} mx={1}>
                <Table variant="simple" size="md">
                    <Thead bg={bgHeader}>
                        <Tr>
                            {colunas.map((coluna, index) => (
                                <Th key={`${coluna.titulo}-${index}`} color={colorTh} borderColor="gray.200">
                                    <b>{coluna.titulo}</b>
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>

                        <Tr>
                            <Td colSpan={colunas.length}>
                                Nada encontrado
                            </Td>
                        </Tr>

                    </Tbody>
                </Table>
            </Box>

        );
    }

    return (
        <Box overflowX="auto" boxShadow="lg" borderRadius="md" bg="white" mb={6} mx={1}>
            <Table variant="simple" size="md">
                <Thead bg={bgHeader}>
                    <Tr>
                        {colunas.map((coluna, index) => (
                            <Th key={`${coluna.titulo}-${index}`} color={colorTh} borderColor="gray.200">
                                <b>{coluna.titulo}</b>
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <LinhasDaTabela colunas={colunas} linhas={linhas} nomeTabela={nomeTabela} navigate={navigate} linhaDestaque={linhaDestaque} abriModalAlterar={abriModalAlterar} abrirModalDeletar={abrirModalDeletar} abrirModalValidarSenha={abrirModalValidarSenha} />
            </Table>
        </Box>
    );
};

export default TabelaCustomizada;
