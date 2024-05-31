import React, { useState } from 'react';
import { Flex, Box, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { BsStarFill } from 'react-icons/bs';

type DifficultyLevel = {
    name: string;
    iconCount: number;
    bgGradientEnabled: string;
    textColorEnabled: string;
    iconColorEnabled: string;
    nivel: string;
};

interface INivelDificuldade {
    onDifficultySelect: (levelName: any) => void;
}

const NivelDificuldade = ({ onDifficultySelect } : INivelDificuldade) => {
    const [selectedLevel, setSelectedLevel] = useState<string>('Médio');

    // Cores e gradientes para o estado desabilitado
    const bgGradientDisabled = useColorModeValue('linear(to-r, gray.600, gray.400)', 'linear(to-r, gray.200, gray.300)');
    const textColorDisabled = useColorModeValue('white', 'gray.800');
    const iconColorDisabled = useColorModeValue('white', 'gray.800');

    const bgGradientEasy = useColorModeValue('linear(to-r, green.400, green.600)', 'linear(to-r, green.200, green.400)');
    const bgGradientIntermediate = useColorModeValue('linear(to-r, orange.400, orange.600)', 'linear(to-r, orange.200, orange.400)');
    const bgGradientHard = useColorModeValue('linear(to-r, red.500, red.700)', 'linear(to-r, red.300, red.500)');

    const textColor = useColorModeValue('white', 'gray.800');
    const iconColor = useColorModeValue('white', 'gray.800');

    const levels: DifficultyLevel[] = [
        { name: 'Iniciante', iconCount: 1, bgGradientEnabled: bgGradientEasy, textColorEnabled: textColor, iconColorEnabled: iconColor, nivel: 'Fácil' },
        { name: 'Intermediário', iconCount: 3, bgGradientEnabled: bgGradientIntermediate, textColorEnabled: textColor, iconColorEnabled: iconColor, nivel: 'Médio' },
        { name: 'Avançado', iconCount: 5, bgGradientEnabled: bgGradientHard, textColorEnabled: textColor, iconColorEnabled: iconColor, nivel: 'Difícil' }
    ];

    const handleLevelClick = (levelName: string) => {
        setSelectedLevel(levelName);
        onDifficultySelect(levelName); // Chama o callback com o nível selecionado
    };

    const renderStars = (count: number, color: string) => {
        return Array.from({ length: count }, (_, index) => <BsStarFill key={index} size="20" color={color} />);
    };


    return (
        <>
            <Flex justify="space-around" align="center" p={4} wrap="wrap">
                {levels.map(level => {
                    const isSelected = level.nivel === selectedLevel;
                    const bgGradient = isSelected ? level.bgGradientEnabled : bgGradientDisabled;
                    const textColor = isSelected ? level.textColorEnabled : textColorDisabled;
                    const iconColor = isSelected ? level.iconColorEnabled : iconColorDisabled;

                    return (
                        <Tooltip key={level.name} label={`Projetos de nível ${level.name}`} placement="top">
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
                                onClick={() => handleLevelClick(level.nivel)}
                                m={2}
                                p="1rem 2rem"
                            >
                                <Text fontSize="1.2rem" my={1} color={textColor}>{level.name}</Text>
                                <Flex>
                                    {renderStars(level.iconCount, iconColor)}
                                </Flex>
                            </Box>
                        </Tooltip>
                    );
                })}
            </Flex>
        </>
    );
};

export default NivelDificuldade;
