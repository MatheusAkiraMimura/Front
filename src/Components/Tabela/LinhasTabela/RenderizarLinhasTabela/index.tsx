import { IconButton, Tooltip, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button, Text, Input, InputGroup, InputRightElement, Flex } from '@chakra-ui/react';
import { FaEdit, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
import { IRetornoBotaoSenha, IRetornoBotoesAlterarDeletar, IRetornoPadraoTabela } from "../../../../Interfaces";
import { useState } from 'react';
import { BDValidarSenha } from '../../../../Api/bancoDados';

// Retorno padrão de dados, não cria nada de especial
export const RenderizarPadraoTabela = ({ dados }: IRetornoPadraoTabela) => (
    <>
        {dados}
    </>
);

export const RenderizarBotaoDetalhes = ({ id, abriModalAlterar, abrirModalDeletar }: IRetornoBotoesAlterarDeletar) => {
    return (
        <Flex>
            <Tooltip label="Alterar" placement="top">
                <IconButton
                    aria-label="Alterar"
                    icon={<FaEdit fontSize="1.5rem" />}
                    onClick={abriModalAlterar ? () => abriModalAlterar(id) : undefined}
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
                    onClick={abrirModalDeletar ? () => abrirModalDeletar(id) : undefined}
                    size="md"
                    mx=".2rem"
                    my=".2rem"
                    colorScheme="red"
                />
            </Tooltip>
        </Flex>
    );
};



// Retorno dos checkbox
export const RenderizarChekbox = ({ dados }: IRetornoPadraoTabela) => {
    // Transforma a string em um array, separando pelos pontos onde há vírgulas
    const checkboxArray = dados.split(',');

    return (
        <>
            {checkboxArray.map((checkbox: any, index: any) => (
                <Text key={index} pb=".2rem">{checkbox}</Text> // Renderiza cada checkbox em uma linha separada
            ))}
        </>
    )
};

export const RenderizarSenha = ({ id, abrirModalValidarSenha }: IRetornoBotaoSenha) => {
  

    return (
        <>
            <Tooltip label="Validar Senha" placement="top">
                <IconButton
                    aria-label="Senha"
                    icon={<FaEye fontSize="1.5rem" />}
                    onClick={abrirModalValidarSenha ? () => abrirModalValidarSenha(id) : undefined}
                    size="md"
                    mx=".2rem"
                    my=".2rem"
                    colorScheme="gray"
                />
            </Tooltip>

           
        </>
    );
};
