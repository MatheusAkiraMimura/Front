import React from 'react';
import { Tbody, Tr, Td, useColorModeValue } from '@chakra-ui/react';
import { Coluna, IRetornoBotaoSenha, IRetornoBotoesAlterarDeletar, IRetornoPadraoTabela } from '../../../Interfaces';
import { RenderizarBotaoDetalhes, RenderizarChekbox, RenderizarPadraoTabela, RenderizarSenha } from './RenderizarLinhasTabela';
import { NavigateFunction } from 'react-router-dom';

const renderizarLinha = (coluna: Coluna, linha: any, navigate: NavigateFunction, abriModalAlterar?: (idSelecionado: any) => void, abrirModalDeletar?: (idSelecionado: any) => void, abrirModalValidarSenha?: (idSelecionado: any) => void) => {
    switch (coluna.chave) {
        case "botoesAlterarDeletar":
            return RenderizarBotaoDetalhes({
                ...linha[coluna.chave] as IRetornoBotoesAlterarDeletar,
                abriModalAlterar,
                abrirModalDeletar
            });

        case "conhecimentos":
            return RenderizarChekbox(linha[coluna.chave] as IRetornoPadraoTabela);

        case "senha":
            return RenderizarSenha({
                ...linha[coluna.chave] as IRetornoBotaoSenha,
                abrirModalValidarSenha,
            });

        default:
            return RenderizarPadraoTabela(linha[coluna.chave] as IRetornoPadraoTabela);
    }
};

export const LinhasDaTabela = ({ colunas, linhas, nomeTabela, linhaDestaque, navigate, abriModalAlterar, abrirModalDeletar, abrirModalValidarSenha }: { colunas: Coluna[]; linhas: any[]; nomeTabela?: string, linhaDestaque?: string, navigate: NavigateFunction, abriModalAlterar?: (idSelecionado: any) => void, abrirModalDeletar?: (idSelecionado: any) => void, abrirModalValidarSenha?: (idSelecionado: any) => void }) => {
    const bgLinhas = useColorModeValue('white', 'var(--chakra-colors-gray-700)')
    const bgLinhaDestaque = useColorModeValue('var(--chakra-colors-gray-200)', 'var(--chakra-colors-gray-500)')

    return (
        <Tbody fontSize="sm" bg={bgLinhas}>
            {linhas.map((linha, index) => {
                return (
                    <Tr key={`${index}-${nomeTabela}`} id={`linha-${index}-${nomeTabela}`}>
                        {colunas.map((coluna, colunaIndex) => (
                            <Td key={`${coluna}-${colunaIndex}`} py=".8rem" background={linha.id.dados == linhaDestaque ? bgLinhaDestaque : ""}>
                                {renderizarLinha(coluna, linha, navigate, abriModalAlterar, abrirModalDeletar, abrirModalValidarSenha)}
                            </Td>
                        ))}
                    </Tr>
                )
            })}
        </Tbody>
    );
};

export default LinhasDaTabela;
