import { FunctionComponent, createContext, useState } from "react";

import { NavigateFunction, useNavigate } from "react-router-dom";

// Chakra UI components
import { useToast, UseToastOptions, ToastId, Box, useColorModeValue, Flex, Heading, Image, Text, Button, Icon, useColorMode } from "@chakra-ui/react";
import { SetFunction } from "../../../Interfaces";

import profileImage from '../Assets/foto.png';
import { FaReact, FaBootstrap, FaPhp, FaDatabase, FaGitAlt, FaCode, FaJava, FaCloud, FaHtml5, FaCss3Alt, FaLaptopCode, FaLock, FaSitemap, FaChevronUp, FaChevronDown, FaMinus, FaPlus } from 'react-icons/fa';
import { SiJavascript } from "react-icons/si";
import { GiAbstract050 } from "react-icons/gi";

//#region Interfaces
interface IInformacoesAkira {}

interface IMeusConhecimentos {}

type CategoryTypes = 'Frontend' | 'Backend' | 'Banco de Dados' | 'Outros';

type Skill = {
    icon: typeof FaReact;
    title: string;
    description: string;
    tipo: CategoryTypes;
};

type Categories = {
    [key in CategoryTypes]: Skill[];
};

type CategoryColors = {
    [key in CategoryTypes]: {
        bgColor: string;
        bgColorCategoria: string;
    };
};

interface ISkillCardProps {
    title: string;
    icon: typeof FaReact;
    description: string;
    bgColor: string;
}

interface ISkillCategoryProps {
    title: CategoryTypes;
    skills: Skill[];
    bgColor: string;
    bgColorCategoria: string;
    isExpanded: boolean;
    toggleCategory: (category: CategoryTypes) => void;
}
//#endregion

//#region types
type BuscarDadosHomeByUser = (
  id: any,
  setForms: SetFunction<any>,
  setIsFormModalOpen: SetFunction<boolean>
) => Promise<void>;

//#endregion types

//#region interface de Context type
interface HomeContextType {
  navigate: NavigateFunction;

  toast: (options?: UseToastOptions) => ToastId;

  savedIdentifier: string | null;

  isLoading: boolean;
  setIsLoading: SetFunction<boolean>;

  InformacoesAkira: FunctionComponent<IInformacoesAkira>;
  MeusConhecimentos: FunctionComponent<IMeusConhecimentos>;
}
//#endregion interface de Context type

export const HomeContext = createContext<HomeContextType | null>(null);

export const HomeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //#region do navigate
  const navigate = useNavigate();
  //#endregion

  //#region do useToast
  const toast = useToast();
  //#endregion

  //#region do Auth
  const savedIdentifier = localStorage.getItem("userIdentifier");
  //#endregion

  //#region de modal de loading
  const [isLoading, setIsLoading] = useState(false);
  //#endregion

  //#region JSONs
  //#endregion

  //#region Tratamentos
  //#endregion

  //#region funções da index de Contato
  const redirectToProjetos = () => {
    navigate("/projetos");
  };

  //#endregion

  //#region ParcialView
  const InformacoesAkira: React.FC<IInformacoesAkira> = ({}) => {
    return (
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
    );
  };

  const SkillCard: React.FC<ISkillCardProps> = ({ title, icon, description, bgColor }) => {
    return (
        <Box p={4} shadow="md" borderWidth="1px" borderRadius="md" bg={bgColor} textAlign="center" w="100%" maxW="18rem">
            <Icon as={icon} w={10} h={10} mb={3} />
            <Text fontSize="lg" fontWeight="bold" mb={2}>{title}</Text>
            <Text>{description}</Text>
        </Box>
    );
};

const SkillCategory: React.FC<ISkillCategoryProps> = ({ title, skills, bgColor, bgColorCategoria, isExpanded, toggleCategory }) => {
    return (
        <Box w="100%" px="1rem">
            <Box
                bg={bgColorCategoria}
                p={5}
                w={isExpanded ? "100%" : "auto"}
                mb={4}
                maxW={isExpanded ? "100%" : "20rem"}
                borderRadius="md"
                shadow="md"
            >
                <Flex justify="space-between" align="center" mb={4}>
                    <Heading as="h3" fontSize="2xl">{title}</Heading>
                    <Icon fontSize="1.6rem" as={isExpanded ? FaMinus : FaPlus} onClick={() => toggleCategory(title)} cursor="pointer"/>
                </Flex>
                {isExpanded && (
                    <Flex wrap="wrap" justify="center" gap={4}>
                        {skills.map((skill, index) => (
                            <SkillCard
                                key={index}
                                icon={skill.icon}
                                title={skill.title}
                                description={skill.description}
                                bgColor={bgColor}
                            />
                        ))}
                    </Flex>
                )}
            </Box>
        </Box>

    );
};

const MeusConhecimentos: React.FC<IMeusConhecimentos> = () => {
    const { colorMode } = useColorMode();

    const [expandedCategories, setExpandedCategories] = useState<CategoryTypes[]>(["Frontend"]);

    const toggleCategory = (category: CategoryTypes) => {
        setExpandedCategories(prevExpanded => {
            if (prevExpanded.includes(category)) {
                // Remove a categoria do array se já estiver expandida
                return prevExpanded.filter(cat => cat !== category);
            } else {
                // Adiciona a categoria ao array
                return [...prevExpanded, category];
            }
        });
    };

    const sortSkillsAlphabetically = (skills: any) => {
        return skills.sort((a: any, b: any) => a.title.localeCompare(b.title));
    };

    const skillCards: Skill[] = [
        {
            icon: SiJavascript,
            title: "JavaScript",
            description: "Linguagem de programação versátil para desenvolvimento web.",
            tipo: "Frontend",
        },
        {
            icon: FaCloud,
            title: "Azure",
            description: "Plataforma de computação em nuvem da Microsoft para serviços de IA, machine learning, hospedagem e muito mais.",
            tipo: "Outros",
        },
        {
            icon: FaSitemap,
            title: "Scrum",
            description: "É uma metodologia ágil para gestão e planejamento de projetos de software.",
            tipo: "Outros",
        },
        {
            icon: GiAbstract050,
            title: "Chakra UI",
            description: "Uma biblioteca React intuitiva para UIs elegantes e acessíveis.",
            tipo: "Frontend",
        },
        {
            icon: FaBootstrap,
            title: "Bootstrap",
            description: "Criação de layouts responsivos e elegantes.",
            tipo: "Frontend",
        },
        {
            icon: FaCss3Alt,
            title: "CSS",
            description: "Estilização e design visual com CSS3.",
            tipo: "Frontend",
        },
        {
            icon: FaDatabase,
            title: "Entity Framework",
            description: "ORM para .NET que facilita o acesso a bancos de dados.",
            tipo: "Banco de Dados",
        },
        {
            icon: FaPhp,
            title: "Laravel",
            description: "Framework PHP para construção de aplicações web robustas.",
            tipo: "Backend",
        },
        {
            icon: FaGitAlt,
            title: "GIT",
            description: "Sistema de controle de versão para gerenciamento de código.",
            tipo: "Outros",
        },
        {
            icon: FaHtml5,
            title: "HTML",
            description: "Estruturação de páginas web com HTML5.",
            tipo: "Frontend",
        },
        {
            icon: FaJava,
            title: "Java",
            description: "Programação robusta para diversas aplicações.",
            tipo: "Backend",
        },
        {
            icon: FaDatabase,
            title: "MySQL",
            description: "Gestão de bancos de dados com MySQL.",
            tipo: "Banco de Dados",
        },
        {
            icon: FaPhp,
            title: "PHP",
            description: "Desenvolvimento de aplicações web do lado do servidor.",
            tipo: "Backend",
        },
        {
            icon: FaReact,
            title: "React",
            description: "Desenvolvimento de interfaces de usuário dinâmicas e modernas.",
            tipo: "Frontend",
        },
        {
            icon: FaDatabase,
            title: "SQL Server",
            description: "Sistemas de gerenciamento de banco de dados SQL.",
            tipo: "Banco de Dados",
        },
        {
            icon: FaCode,
            title: "Typescript",
            description: "Fortalecimento do JavaScript com tipos estáticos para desenvolvimento robusto.",
            tipo: "Frontend",
        },
        {
            icon: FaCode, // Escolha um ícone mais apropriado se necessário
            title: "C#",
            description: "Desenvolvimento com a linguagem C# para aplicações .NET.",
            tipo: "Backend",
        },
        {
            icon: FaCloud, // Escolha um ícone mais apropriado se necessário
            title: ".NET",
            description: "Framework para desenvolvimento de aplicações web e serviços.",
            tipo: "Backend",
        },
        {
            icon: FaLaptopCode, // Escolha um ícone mais apropriado se necessário
            title: "API Restful",
            description: "Desenvolvimento de APIs seguindo os princípios RESTful.",
            tipo: "Backend",
        },
        {
            icon: FaLock, // Escolha um ícone mais apropriado se necessário
            title: "JWT",
            description: "Implementação de autenticação e segurança com JSON Web Tokens.",
            tipo: "Outros",
        },
        // Adicione mais habilidades se necessário
    ];

    const categories: Categories = {
        "Frontend": sortSkillsAlphabetically(skillCards.filter(skill => skill.tipo === "Frontend")),
        "Backend": sortSkillsAlphabetically(skillCards.filter(skill => skill.tipo === "Backend")),
        "Banco de Dados": sortSkillsAlphabetically(skillCards.filter(skill => skill.tipo === "Banco de Dados")),
        "Outros": sortSkillsAlphabetically(skillCards.filter(skill => skill.tipo === "Outros")),
    };

    const categoryColors: CategoryColors = colorMode === "light" ? {
        "Frontend": { bgColor: "blue.100", bgColorCategoria: "blue.300" },
        "Backend": { bgColor: "green.100", bgColorCategoria: "green.300" },
        "Banco de Dados": { bgColor: "orange.100", bgColorCategoria: "orange.300" },
        "Outros": { bgColor: "gray.100", bgColorCategoria: "gray.300" }
    } : {
        "Frontend": { bgColor: "blue.400", bgColorCategoria: "blue.600" },
        "Backend": { bgColor: "green.400", bgColorCategoria: "green.600" },
        "Banco de Dados": { bgColor: "orange.400", bgColorCategoria: "orange.600" },
        "Outros": { bgColor: "gray.400", bgColorCategoria: "gray.600" }
    };

    return (
        <Box w="100%" maxW="100rem" m="0 auto">
            <Heading as="h1" textAlign="center" fontSize={{ base: '1.8rem', md: "2rem", lg: '3rem' }} pb={4}>Meus conhecimentos</Heading>

            <Flex
                direction={{ base: "column", lg: expandedCategories.length !== 0 ? "column" : "row" }}
                alignItems="flex-start"
                gap={4}
            >
                {Object.keys(categories).map((category) => {
                    const categoryType = category as CategoryTypes;
                    return (
                        <SkillCategory
                            key={categoryType}
                            title={categoryType}
                            skills={categories[categoryType]}
                            bgColor={categoryColors[categoryType].bgColor}
                            bgColorCategoria={categoryColors[categoryType].bgColorCategoria}
                            isExpanded={expandedCategories.includes(categoryType)}
                            toggleCategory={() => toggleCategory(categoryType)}
                        />
                    );
                })}
            </Flex>
        </Box>
    );
};

  //#endregion

  return (
    <HomeContext.Provider
      value={{
        navigate,

        toast,

        savedIdentifier,

        isLoading,
        setIsLoading,

        InformacoesAkira,
        MeusConhecimentos,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
/* Fim do Contexto */
