import React from 'react';
import { Button, IconButton, Stack } from '@chakra-ui/react';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';

interface PaginacaoProps {
  itensTotais: number;
  itensPorPagina: number;
  paginaAtual: number;
  mudarPagina: (numeroPagina: number) => void;
}

const Paginacao: React.FC<PaginacaoProps> = ({ itensTotais, itensPorPagina, paginaAtual, mudarPagina }) => {
    const numeroDePaginas = Math.ceil(itensTotais / itensPorPagina);

    return (
        <Stack direction="row" spacing={4} justify="center" align="center" my={4} display={itensTotais === 0 ? "none" : "flex"}>
            <IconButton
                icon={<FaAngleDoubleLeft />}
                onClick={() => mudarPagina(1)}
                isDisabled={paginaAtual === 1}
                aria-label="Primeira Página"
            />
            <IconButton
                icon={<FaAngleLeft />}
                onClick={() => mudarPagina(Math.max(1, paginaAtual - 1))}
                isDisabled={paginaAtual === 1}
                aria-label="Página Anterior"
            />
            {Array.from({ length: numeroDePaginas }, (_, i) => i + 1).map(numero => (
                <Button
                    key={numero}
                    onClick={() => mudarPagina(numero)}
                    disabled={paginaAtual === numero}
                    colorScheme={paginaAtual === numero ? 'teal' : 'gray'}
                >
                    {numero}
                </Button>
            ))}
            <IconButton
                icon={<FaAngleRight />}
                onClick={() => mudarPagina(Math.min(numeroDePaginas, paginaAtual + 1))}
                isDisabled={paginaAtual === numeroDePaginas}
                aria-label="Próxima Página"
            />
            <IconButton
                icon={<FaAngleDoubleRight />}
                onClick={() => mudarPagina(numeroDePaginas)}
                isDisabled={paginaAtual === numeroDePaginas}
                aria-label="Última Página"
            />
        </Stack>
    );
};

export default Paginacao;
