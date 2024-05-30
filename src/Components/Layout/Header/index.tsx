import React from 'react';

import {
  Box,
  Flex,
  Heading,
  Button,
  useColorMode,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  MenuDivider
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaBars, FaHome, FaProjectDiagram, FaEnvelope, FaSignInAlt, FaUserCog, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface IHeader {
  paginaAtual: string;
}

const Header = ({ paginaAtual }: IHeader) => {
  const navigate = useNavigate();

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const CorMenuItem = useColorModeValue('purple', 'var(--chakra-colors-purple-200)');

  const redirectToHome = () => {
    navigate("/");
  };

  const redirectToContato = () => {
    navigate("/contato");
  };

  const redirectToProjetos = () => {
    navigate("/projetos");
  };

  const token = localStorage.getItem('token');
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('tokenTime');
    navigate("/login");
  };


  return (
    <Box
      px={4}
      bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      w="100%"
      position="fixed" // Fixar no topo
      top={0} // Posição no topo
      zIndex={1000} // Elevação acima dos outros elementos
      boxShadow="lg" // Adiciona uma sombra para destacar
    >
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={{ base: 'column', md: 'row' }}
        py={{ base: 2, md: 0 }}
      >
        <Flex justifyContent={'space-between'} w="100%" mb={{ base: 4, md: 0 }}>
          <Heading as="h1" fontSize={{ base: "1.3rem", md: "1.5rem", lg: "1.7rem" }} letterSpacing={'tighter'} pt={{ base: ".5rem", md: "0" }}>
            Matheus Akira Mimura
          </Heading>

          <Menu isOpen={isOpen} onClose={onClose}>
            <MenuButton
              as={IconButton}
              icon={<FaBars />}
              display={{ base: 'inline-flex', md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
              variant="outline"
              aria-label="Options"
            />
            <MenuList>
              <MenuItem textColor={paginaAtual === "home" ? CorMenuItem : "initial"} icon={<FaHome fontSize="1.5rem" />} onClick={redirectToHome}>Home</MenuItem>
              <MenuItem textColor={paginaAtual === "projetos" ? CorMenuItem : "initial"} icon={<FaProjectDiagram fontSize="1.5rem" />} onClick={redirectToProjetos}>Projetos</MenuItem>
              <MenuItem textColor={paginaAtual === "contato" ? CorMenuItem : "initial"} icon={<FaEnvelope fontSize="1.5rem" />} onClick={() => {/* Lógica de navegação para Contato */ }}>Contato</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {/* Botões exibidos apenas em telas maiores */}
        <Flex
          display={{ base: 'none', md: 'flex' }}
          flexGrow={1}
          justifyContent="flex-end"
        >
          {[
            { text: 'Home', icon: <FaHome fontSize="1.5rem" />, pagina: 'home', link: redirectToHome },
            { text: 'Projetos', icon: <FaProjectDiagram fontSize="1.3rem" />, pagina: 'projetos', link: redirectToProjetos },
            { text: 'Contato', icon: <FaEnvelope fontSize="1.3rem" />, pagina: 'contato', link: redirectToContato }
          ].map((item) => (
            token && (item.pagina === 'login' || item.pagina === 'cadastro') ? (
              <Menu key={`item-menu-${item.pagina}`}>
                <MenuButton colorScheme={paginaAtual === ("perfil") ? "purple" : undefined} as={Button} leftIcon={<FaUserCog fontSize="1.4rem" />}>
                  Configurações
                </MenuButton>
                <MenuList>
        

                  <MenuItem icon={colorMode === 'light' ? <FaMoon fontSize="1.1rem" /> : <FaSun fontSize="1.1rem" />} onClick={toggleColorMode}>
                    Modo {colorMode === 'light' ? 'noturno' : 'claro'}
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<FaSignInAlt fontSize="1.1rem" />} onClick={logout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) :
              <Button
                key={item.text}
                variant="ghost"
                onClick={item.link}
                leftIcon={item.icon}
                colorScheme={paginaAtual === item.pagina ? "purple" : "initial"}
              >
                {item.text}
              </Button>
          ))}
        </Flex>

        {!token && (
          <IconButton
            display={{ base: 'none', md: 'inline-flex' }}
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            isRound={true}
            size="md"
            alignSelf={'center'}
            onClick={toggleColorMode}
            aria-label={colorMode === 'light' ? 'Dark mode' : 'Light mode'}
            color={colorMode === 'light' ? '' : 'var(--chakra-colors-teal-200)'}
          />
        )}
      </Flex>
    </Box>
  );
};

export default Header
