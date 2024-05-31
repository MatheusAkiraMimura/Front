import React, { useEffect, useState } from 'react';
import {
    Grid,
    GridItem,
    Image,
    LinkBox,
    Box,
    Text,
    Button,
    useColorModeValue,
    Spinner, // Adicione o Spinner do Chakra UI
} from '@chakra-ui/react';


interface IProjeto {
    id: number
    titulo: string;
    descricao: string;
    dificuldade: string;
    imageUrl: string;
    link: string;
}

interface IProjetosGrid {
    projetos: IProjeto[];
    clicarSaibaMais: (rota: any) => void;
}

const ProjectsGrid = ({ projetos, clicarSaibaMais }: IProjetosGrid) => {
    const [selectedProjeto, setSelectedProjeto] = useState<number | null>(0);
    const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

    const overlayBgColor = useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(0, 0, 0, 0.8)');
    const bordaColor = useColorModeValue('gray.200', 'gray.700');

    useEffect(() => {
        setIsLoading(true);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [projetos]);

    return (
        <Box>
            <Grid templateColumns={{ base: 'repeat(auto-fill, minmax(16rem, 1fr))', sm: 'repeat(auto-fill, minmax(22rem, 1fr))', md: 'repeat(auto-fill, minmax(35rem, 1fr))' }} gap={{ base: 6, md: 12 }} p={6} maxW="100rem" justifyContent="center" m="0 auto">
                {projetos.map((projeto, index) => (
                    <GridItem w="100%" maxW="40rem" key={`${projeto.titulo}-${index}`} m="0 auto">
                        <LinkBox cursor="pointer" boxShadow="2xl" _hover={{ boxShadow: 'dark-lg' }} position="relative"
                            border="1px" borderRadius="lg" borderColor={bordaColor} overflow="hidden">
                            {isLoading ? (
                                <Box textAlign="center" py="12.68rem">
                                    <Spinner size="lg" color="blue.500" />
                                </Box>

                            ) : (
                                <>
                                    <Image src={projeto.imageUrl} alt={projeto.titulo} />
                                    {selectedProjeto === index && (
                                        <Box
                                            position="absolute"
                                            bottom="0"
                                            left="0"
                                            right="0"
                                            bg={overlayBgColor}
                                            p="4"
                                            onClick={() => setSelectedProjeto(null)}
                                            textAlign="center"
                                            zIndex={999}
                                        >
                                            <Text fontSize="lg" fontWeight="bold">{projeto.titulo}</Text>
                                            <Text>{projeto.descricao}</Text>
                                            <Button colorScheme="purple" mt="3" onClick={() => clicarSaibaMais(projeto.link)}>
                                                Saiba mais
                                            </Button>
                                        </Box>
                                    )}
                                    <Box
                                        position="absolute"
                                        top="0"
                                        left="0"
                                        right="0"
                                        bottom="0"
                                        onClick={() => setSelectedProjeto(index)}
                                        zIndex={998}
                                    ></Box>
                                </>
                            )}
                        </LinkBox>
                    </GridItem>
                ))}

            </Grid>
        </Box>
    );
};

export default ProjectsGrid;
