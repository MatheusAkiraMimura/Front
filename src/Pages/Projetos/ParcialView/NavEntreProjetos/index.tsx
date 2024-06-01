import React from "react";
import { Box, Button, Flex, IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface INavEntreProjetos {
    rota: string;
    textoIconButton: string;
    textoButton: string;
    children: React.ReactNode;
    botaoDireita?: boolean;
}

const NavEntreProjetos = ({ rota, textoIconButton, textoButton, children, botaoDireita }: INavEntreProjetos) => {
    const navigate = useNavigate();

    const redirect = () => {
        navigate(`/${rota}`);
    };

    const bgColor = useColorModeValue("gray.300", "gray.500");

    return (
        <Box p={{base: "2rem 2rem", sm: "2rem 4rem"}} w="100%" m="0 auto 1rem auto" bgColor={bgColor}>
            <Flex align="center" justifyContent={{base: "space-around", lg: "space-between"}} maxW="80rem" m="0 auto">
                <Tooltip label={textoIconButton} aria-label="Dica de navegação">
                    <Button
                        leftIcon={<FaArrowLeft />}
                        onClick={redirect}
                        size="lg"
                        colorScheme="purple"
                        _hover={{ transform: 'scale(1.1)' }}
                        ml={8}
                    >
                        <Box pl=".5rem" display={{base: "none", sm: "block"}}>
                           {textoButton}
                        </Box>
                    </Button>
                </Tooltip>


                {children}

                <Button
                    leftIcon={<FaArrowLeft />}
                    onClick={redirect}
                    size="lg"
                    colorScheme="teal"
                    _hover={{ transform: 'scale(1.1)' }}
                    ml={8}
                    display={botaoDireita ? "none" : {base: "none", lg: "inline-block"}}
                    visibility="hidden"
                >
                    <Box pl=".5rem">
                        Projetos
                    </Box>
                </Button>
            </Flex>
        </Box>
    );
};

export default NavEntreProjetos;
