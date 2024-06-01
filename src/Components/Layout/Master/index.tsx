import React, { ReactNode, useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Box, VStack, Spinner, Center, Text, Modal, ModalOverlay, ModalContent, ModalBody, Flex } from '@chakra-ui/react';

interface MasterPageProps {
    children: ReactNode;
    paginaAtual: string;
    setShowModal: (state: boolean) => void;
    showModal: boolean;
    setEnviandoForm?: (state: boolean) => void;
    enviandoForm?: boolean;
}

const LoadingScreen = () => (
    <Center minH="88svh">
        <VStack>
            <Spinner style={{ width: "105px", height: "105px" }} color="blue.500" />
            <Text mt={3} fontSize="xl">Carregando...</Text>
        </VStack>
    </Center>
);

const MasterPage = ({ children, paginaAtual, showModal, setShowModal, enviandoForm, setEnviandoForm }: MasterPageProps) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Substitua esta lógica pelo seu carregamento real
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showModal && enviandoForm && setEnviandoForm) {
            setShowModal(false)
            setEnviandoForm(false)
        }
    }, [showModal, enviandoForm]);

    function vazio() { }

    return (
        isLoading ? (
            <LoadingScreen />
        ) : (
            <VStack minH="100vh" flexDirection="column" justifyContent="space-between" transition="opacity 0.5s ease-out" id='topoPagina'>
                <Modal isOpen={showModal} onClose={vazio}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalBody>
                            <Flex direction="column" align="center" justify="center" p={5}>
                                <Spinner size="xl" mb={4} color="blue.500" />
                                <Text fontSize="lg" textAlign="center">
                                    Estamos processando seu formulário. Por favor, aguarde um momento.
                                </Text>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                <Header paginaAtual={paginaAtual} />
                <Box as="main" flex="1" w="100%" mt="2rem">
                    {children}
                </Box>
                <Footer />
            </VStack>

        )

    );
};

export default MasterPage;
