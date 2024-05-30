import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Image,
  Stack,
  Icon,
  Link
} from '@chakra-ui/react';
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from 'react-icons/fa';
import MasterPage from '../../Components/Layout/Master';
import profileImage from './Assets/foto.png';

const Contato = () => {
  // Estado para gerenciar os dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [showModal, setShowModal] = useState(false);

  // Função para atualizar os dados do formulário
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: any) => {
    e.preventDefault();

  };

  return (
    <MasterPage paginaAtual="contato" setShowModal={setShowModal} showModal={showModal}>
      <Flex direction={{ base: 'column', md: 'row' }} p={6} maxW="80rem" w="100%" m="4rem auto">
        <Box bg={useColorModeValue('white', 'gray.700')} rounded="md" shadow="lg" p={6} flex="1">
          <Flex direction={{ base: 'column', md: 'row' }} alignItems="center">
            <Box flex="1" ml={{ base: 0, md: 6 }} w="100%">
              <Flex justifyContent="space-between">
                <Text fontSize={{base: "1.2rem", sm: "1.5rem", md: "2rem"}} alignItems="center" py={{ base: "1rem", sm: "2rem", lg: "3rem" }} fontWeight="bold">Matheus Akira Mimura</Text>
                <Box flexShrink={0} display={{base: "none", sm: "block"}}>
                  <Image borderRadius="full" boxSize="150px" src={profileImage} alt="Minha foto" />
                </Box>
              </Flex>

              <Text><b>Idade:</b> 22 anos</Text>
              <Text><b>Localização:</b> São Paulo, Brasil</Text>
              <Text><b>Descrição:</b> um profissional de Tecnologia da Informação formado pela Fatec Barueri, com conhecimentos no Frontend, Backend, bancos de dados e metodologias ágeis.</Text>
              {/* Aqui você pode adicionar mais informações ou uma breve biografia */}
              <Stack spacing={3} mt={3}>
                <Flex alignItems="center">
                  <Icon as={FaEnvelope} mr={2} />
                  <Link display={{ base: 'none', sm: 'block' }} href={`mailto:matheus.akiramimura@gmail.com`} isExternal>matheus.akiramimura@gmail.com</Link>
                  <Link display={{ base: 'block', sm: 'none' }} href={`mailto:matheus.akiramimura@gmail.com`} isExternal>matheus.akiramimura@ gmail.com</Link>
                </Flex>
                <Flex alignItems="center">
                  <Icon as={FaPhone} mr={2} />
                  <Text>(11) 95555-9620</Text>
                </Flex>
                <Flex alignItems="center">
                  <Icon as={FaGithub} mr={2} />
                  <Link href="https://github.com/MatheusAkiraMimura" isExternal>GitHub</Link>
                </Flex>
                <Flex alignItems="center">
                  <Icon as={FaLinkedin} mr={2} />
                  <Link href="https://www.linkedin.com/in/matheus-akira-mimura-fullstack/" isExternal>LinkedIn</Link>
                </Flex>
              </Stack>
            </Box>
          </Flex>
        </Box>

        {/* Seção do Formulário de Contato */}
        <Box flex="1" ml={{ base: "", md: "3rem" }}>
          <form onSubmit={handleSubmit}>
            <FormControl id="name" mb={3} mt={5}>
              <FormLabel>Nome</FormLabel>
              <Input name="name" type="text" onChange={handleChange} />
            </FormControl>
            <FormControl id="email" mb={3}>
              <FormLabel>E-mail</FormLabel>
              <Input name="email" type="email" onChange={handleChange} />
            </FormControl>
            <FormControl id="subject" mb={3}>
              <FormLabel>Assunto</FormLabel>
              <Input name="subject" type="text" onChange={handleChange} />
            </FormControl>
            <FormControl id="message" mb={3}>
              <FormLabel>Mensagem</FormLabel>
              <Textarea name="message" onChange={handleChange} />
            </FormControl>
            <Button colorScheme="blue" type="submit">Enviar Mensagem</Button>
          </form>
        </Box>

      </Flex>
    </MasterPage>
  );
};

export default Contato;
