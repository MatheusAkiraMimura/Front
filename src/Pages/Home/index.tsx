import React, { useState } from 'react';
import MasterPage from '../../Components/Layout/Master';
import { Box, Text, Button, Flex, Heading, Image } from '@chakra-ui/react';
import profileImage from './Assets/foto.png';
import Skills from './Skill';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const redirectToProjetos = () => {
    navigate("/projetos");
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <MasterPage paginaAtual="home" setShowModal={setShowModal} showModal={showModal}>
      <Flex w="100%" justifyContent="center">
        <Flex direction={{ base: 'column', lg: 'row' }} align="center" justify="space-around" py={10} px={5} maxW="100rem" minH="70vh">
          <Box flex="1" marginRight="1rem">
            <Image src={profileImage} borderRadius="full" boxSize="26rem" marginBottom="1rem" />
          </Box>

          <Box flex="2">
            <Heading as="h1" size="2xl" mb={4}>Desenvolvedor Full-Stack</Heading>
            <Text fontSize="lg" mb={4}>
              Graduado no ano de 2022, tenho mais de 2 anos de experiência profissional como desenvolvedor Full-Stack, tendo como aptidões comunicação, organização, rápido aprendizado e dedicação.
            </Text>

            <Text fontSize="lg" mb={4}>
              Atualmente estou trabalhando com .NET e C# no backend, banco de dados SQLServer, ORM sendo o Entitie Framwork e no frontend React, Typescript e bootstrap.
            </Text>
            <Button colorScheme="purple" mr={3} onClick={redirectToProjetos}>Meus Projetos </Button>
            <Button colorScheme="gray" variant="outline">Currículo</Button>
          </Box>
        </Flex>
      </Flex>

      <Skills />
    </MasterPage>
  );
};

export default Home;

