import React, { ReactElement, useState } from 'react';
import { Flex, Box, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { ITiposOpcoes } from '../../Interfaces';

interface IMenuOpcoes {
    aoselecionarOpcao: (value: any) => void;
    opcoes: ITiposOpcoes[];
    tituloTooltip: string;
    icone: ({ color }: { color: string }) => ReactElement;
}

const renderizarIcone = (
    count: number,
    IconComponent: ({ color }: { color: string }) => ReactElement,
    color: string
) => {
    return Array.from({ length: count }, (_, index) => (
        <IconComponent key={index} color={color} />
    ));
};

const MenuOpcoes = ({ aoselecionarOpcao, opcoes, tituloTooltip, icone }: IMenuOpcoes) => {
    const [selectedLevel, setSelectedLevel] = useState<string>('Médio');

    // Cores e gradientes para o estado desabilitado
    const bgGradientDisabled = useColorModeValue('linear(to-r, gray.600, gray.400)', 'linear(to-r, gray.200, gray.300)');
    const textColorDisabled = useColorModeValue('white', 'gray.800');
    const iconColorDisabled = useColorModeValue('gray.700', 'gray.800');

    const handleOpcaoClick = (value: string) => {
        setSelectedLevel(value);
        aoselecionarOpcao(value);
    };

    return (
        <>
            <Flex justify="space-around" align="center" p={4} wrap="wrap">
                {opcoes.map(opcao => {
                    const isSelected = opcao.value === selectedLevel;
                    const bgGradient = isSelected ? opcao.bgGradientEnabled : bgGradientDisabled;
                    const textColor = isSelected ? opcao.textColorEnabled : textColorDisabled;
                    const iconColor = isSelected ? opcao.iconColorEnabled : iconColorDisabled;

                    return (
                        <Tooltip key={opcao.value} label={`${tituloTooltip} ${opcao.titulo}`} placement="top">
                            <Box
                                w={['120px', '150px']}
                                h={['100px', '130px']}
                                bgGradient={bgGradient}
                                borderRadius="lg"
                                boxShadow="md"
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                textAlign="center"
                                cursor="pointer"
                                transition="all 0.3s ease"
                                _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
                                onClick={() => handleOpcaoClick(opcao.value)}
                                m={2}
                                p="1rem 2rem"
                            >
                                <Text fontSize="1.28rem" my={1} color={textColor}>{opcao.titulo}</Text>
                                <Flex>
                                    {renderizarIcone(opcao.iconCount, icone, iconColor)}
                                </Flex>
                            </Box>
                        </Tooltip>
                    );
                })}
            </Flex>
        </>
    );
};

export default MenuOpcoes;
