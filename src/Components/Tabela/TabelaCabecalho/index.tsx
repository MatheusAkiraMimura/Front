import React from 'react';
import { Thead, Tr, Th, Flex, Text } from '@chakra-ui/react';
import { Coluna } from '../../../Interfaces';

interface TabelaCabecalhoProps {
    colunas: Coluna[];
}

export const TabelaCabecalho = ({ colunas }: TabelaCabecalhoProps) => {
    return (
        <Thead>
            <Tr>
                {colunas.map((coluna, index) => (
                    <Th key={`${coluna.titulo}-${index}`}>
                        <Flex>
                            <Text>{coluna.titulo}</Text>
                        </Flex>
                    </Th>
                ))}
            </Tr>
        </Thead>
    );
};

export default TabelaCabecalho;
