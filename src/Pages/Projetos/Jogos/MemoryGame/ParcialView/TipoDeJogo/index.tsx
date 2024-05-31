import React, { useState } from 'react';
import { Flex, Box, Text, Tooltip, useColorModeValue, useToast } from '@chakra-ui/react';
import { FaPaw, FaFish, FaFeatherAlt } from 'react-icons/fa'; // Importando ícones para os tipos de jogos

type TipoDeJogo = {
    name: string;
    tipoIcone: JSX.Element; // Usando JSX.Element para renderizar ícones
    bgGradientEnabled: string;
    textColorEnabled: string;
    iconColorEnabled: string;
    tipo: string;
};

interface ITipoDeJogoMemoria {
    onSelectType: (typeName: string) => void; // Função para ser chamada ao selecionar um tipo
    bloquearClique: boolean
}


const TipoDeJogoMemoria = ({ onSelectType, bloquearClique }: ITipoDeJogoMemoria) => {
    // Toast (Alert)
    const toast = useToast();

    const [selectedType, setSelectedType] = useState<string>('terrestre');

    // Definindo cores e gradientes para os estados habilitado e desabilitado
    const bgGradientDisabled = useColorModeValue('linear(to-r, gray.600, gray.400)', 'linear(to-r, gray.200, gray.300)');
    const textColorDisabled = useColorModeValue('white', 'gray.800');

    const bgGradientTerrestre = useColorModeValue('linear(to-r, green.300, green.600)', 'linear(to-r, green.100, green.400)');
    const bgGradientMarinho = useColorModeValue('linear(to-r, blue.300, blue.600)', 'linear(to-r, blue.100, blue.400)');
    const bgGradientAereo = useColorModeValue('linear(to-r, cyan.200, pink.400)', 'linear(to-r, cyan.100, pink.300)');

    const textColor = useColorModeValue('white', 'gray.800');
    const iconColor = useColorModeValue('white', 'gray.800');

    // Definindo os tipos de jogos disponíveis
    const tipos: TipoDeJogo[] = [
        { name: 'Terrestres', tipoIcone: <FaPaw fontSize="1.7rem" color={iconColor} />, bgGradientEnabled: bgGradientTerrestre, textColorEnabled: textColor, iconColorEnabled: iconColor, tipo: 'terrestre' },
        { name: 'Marinhos', tipoIcone: <FaFish fontSize="2rem"  color={iconColor} />, bgGradientEnabled: bgGradientMarinho, textColorEnabled: textColor, iconColorEnabled: iconColor, tipo: 'marinho' },
        { name: 'Aves', tipoIcone: <FaFeatherAlt fontSize="1.4rem"  color={iconColor} />, bgGradientEnabled: bgGradientAereo, textColorEnabled: textColor, iconColorEnabled: iconColor, tipo: 'aereo' }
    ];

    // Manipulador para quando um tipo é clicado
    const handleTypeClick = (typeName: string) => {
        if (!bloquearClique) {
            onSelectType(typeName);
            setSelectedType(typeName);
        } else {
            onSelectType(typeName);
            toast({
                title: 'Jogo reiniciado.',
                description: "Você não pode mudar de modo de jogo, enquanto houver uma carta virada.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    // Renderização do componente
    return (
        <Flex justify="space-around" align="center" p={4} wrap="wrap">
            {tipos.map(level => {
                const isSelected = level.tipo === selectedType;
                const bgGradient = isSelected ? level.bgGradientEnabled : bgGradientDisabled;
                const textColor = isSelected ? level.textColorEnabled : textColorDisabled;

                return (
                    <Tooltip key={level.name} label={`Jogo de memória tipo ${level.name}`} placement="top">
                        <Box
                            w={['120px', '150px']}
                            h={['100px', '110px']}
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
                            onClick={() => handleTypeClick(level.tipo)}
                            m={2}
                            p="1rem 2rem"
                        >
                            <Text fontSize="1.2rem" my={1} color={textColor}>{level.name}</Text>
                            {level.tipoIcone}
                        </Box>
                    </Tooltip>
                );
            })}
        </Flex>
    );
};

export default TipoDeJogoMemoria;
