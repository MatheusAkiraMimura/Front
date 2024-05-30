import React from 'react';
import { Box, Flex, Text, Link, Container, Stack, useColorModeValue, VStack } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box
            bg={useColorModeValue('gray.100', 'gray.700')}
            color={useColorModeValue('gray.600', 'gray.200')}
            w="100%"
            px={{ base: '1rem', md: '5rem' }}
        >
            <Container as={Stack} maxW={'6xl'} py={4} spacing={4} justify={'center'} align={'center'} w="100%">
                <Flex direction="row" align={'center'} justify={'space-between'} wrap="wrap" maxW="40rem" w="100%">
                    <VStack align="flex-start" maxW="100%">
                        <Text fontWeight="bold">Redes</Text>
                        <Link href="https://www.instagram.com/mathe.akira/" isExternal>Instagram</Link>
                        <Link href="https://www.linkedin.com/in/matheus-akira-mimura-fullstack/" isExternal>LinkedIn</Link>
                        <Link href="https://github.com/MatheusAkiraMimura" isExternal>GitHub</Link>
                    </VStack>

                    <VStack align="flex-start" maxW="100%">
                        <Text fontWeight="bold">Contato</Text>
                        <Text>(11) 95555-9620</Text>
                        <Link href={`mailto:matheus.akiramimura@gmail.com`} isExternal>matheus.akiramimura@gmail.com</Link>

                    </VStack>
                </Flex>
                <Text pt={4} w="100%" textAlign="center">© {new Date().getFullYear()} Matheus Akira Mimura. Todos os direitos reservados.</Text>
            </Container>
        </Box>
    );
};

export default Footer;
