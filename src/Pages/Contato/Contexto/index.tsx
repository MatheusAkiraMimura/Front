import React, {
  FunctionComponent,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { NavigateFunction, useNavigate } from "react-router-dom";

// Chakra UI components
import {
  useToast,
  UseToastOptions,
  ToastId,
  Box,
  Flex,
  Image,
  Text,
  Stack,
  Icon,
  Link,
  useColorModeValue,
  FormControl,
  Button,
  Input,
} from "@chakra-ui/react";
import { SetFunction } from "../../../Interfaces";
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import profileImage from "../Assets/foto.png";
import { Field, Form, Formik } from "formik";
import { BDCreateContato, BDGetAllContato } from "../../../Api/BDContato";

//#region Interfaces
interface IInformacoesAkira {}

interface IChatConversa {}

interface Message {
  id: number;
  text: string;
  sender: "user" | "me";
  timestamp: Date;
  sendTo: string;
}
//#endregion

//#region types

type FetchMessages = (setMessages: SetFunction<Message[]>) => Promise<void>;

type HandleSendMessage = (
  values: { message: string },
  resetForm: () => void,
  sendToIdentifier: any,
  setMessages: SetFunction<any>,
  setRecarregarMensagens: SetFunction<boolean>
) => Promise<void>;

type CheckForNewMessages = (
  messages: Message[],
  setMessages: SetFunction<Message[]>,
  setRecarregarMensagens: SetFunction<boolean>
) => Promise<void>;
//#endregion types

//#region interface de Context type
interface ContatoContextType {
  navigate: NavigateFunction;

  toast: (options?: UseToastOptions) => ToastId;

  savedIdentifier: string | null;

  isLoading: boolean;
  setIsLoading: SetFunction<boolean>;

  InformacoesAkira: FunctionComponent<IInformacoesAkira>;
  ChatConversa: FunctionComponent<IChatConversa>;
}
//#endregion interface de Context type

export const ContatoContext = createContext<ContatoContextType | null>(null);

export const ContatoProvider: React.FC<{ children: React.ReactNode }> = ({
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
  const fetchMessages: FetchMessages = async (setMessages) => {
    try {
      const response = await BDGetAllContato();
      const messages = response.data
        .filter(
          (message: any) =>
            (message.identificadorUser === "IDadmAkira2024_06_01" &&
              message.sendTo === savedIdentifier) ||
            message.identificadorUser === savedIdentifier
        )
        .map((message: any) => ({
          id: message.id,
          text: message.mensagem,
          sender: message.identificadorUser === savedIdentifier ? "me" : "user",
          timestamp: new Date(message.created_at),
          sendTo: message.sendTo,
        }));
      setMessages(messages);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar mensagens.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleSendMessage: HandleSendMessage = async (
    values,
    resetForm,
    sendToIdentifier,
    setMessages,
    setRecarregarMensagens
  ) => {
    if (!savedIdentifier) {
      toast({
        title: "Erro",
        description: "Identificador do usuário não encontrado.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
  
    if (values.message.trim() === "") return;
  
    const newMessage = {
      mensagem: values.message,
      identificadorUser: savedIdentifier,
      sendTo: sendToIdentifier,
    };
  
    try {
      const response = await BDCreateContato(newMessage);
      const savedMessage: Message = {
        id: response.data.id,
        text: response.data.mensagem,
        sender: "me",
        timestamp: new Date(response.data.created_at),
        sendTo: response.data.sendTo,
      };
      setMessages((prevMessages: any) => [...prevMessages, savedMessage]);
      setRecarregarMensagens(true);
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao enviar mensagem.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const checkForNewMessages: CheckForNewMessages = async (
    messages,
    setMessages,
    setRecarregarMensagens
  ) => {
    try {
      const response = await BDGetAllContato();
      const newMessages = response.data
        .filter(
          (message: any) =>
            (message.identificadorUser === "IDadmAkira2024_06_01" &&
              message.sendTo === savedIdentifier) ||
            message.identificadorUser === savedIdentifier
        )
        .map((message: any) => ({
          id: message.id,
          text: message.mensagem,
          sender: message.identificadorUser === savedIdentifier ? "me" : "user",
          timestamp: new Date(message.created_at),
          sendTo: message.sendTo,
        }));

      // Atualiza as mensagens somente se houver novas mensagens
      if (newMessages.length > messages.length) {
        setMessages(newMessages);
        setRecarregarMensagens(true);
        console.log("VEIO AQUI");

        console.log(messages.length);
        console.log(newMessages.length);
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao verificar novas mensagens.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  //#endregion

  //#region ParcialView
  const InformacoesAkira: React.FC<IInformacoesAkira> = ({}) => {
    const calculateAge = (birthDate: Date) => {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    };

    const calculateWorkingTime = (startDate: Date) => {
      const today = new Date();
      let years = today.getFullYear() - startDate.getFullYear();
      let months = today.getMonth() - startDate.getMonth();
      let days = today.getDate() - startDate.getDate();

      if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      let result = "";
      if (years > 0) {
        result += `${years} ano${years > 1 ? "s" : ""} `;
      }
      if (months > 0) {
        result += `${months} mês${months > 1 ? "es" : ""} `;
      }
      if (days > 0) {
        result += `${days} dia${days > 1 ? "s" : ""}`;
      }
      return result.trim();
    };

    const birthDate = new Date(2001, 1, 8);
    const age = calculateAge(birthDate);

    const birthDateJob = new Date(2023, 7, 9);
    const tempoTrabalhando = calculateWorkingTime(birthDateJob);

    const bgInfos = useColorModeValue("white", "gray.700");

    return (
      <Box bg={bgInfos} rounded="md" shadow="lg" p={6} flex="1">
        <Flex direction={{ base: "column", md: "row" }} alignItems="center">
          <Box flex="1" ml={{ base: 0, md: 6 }} w="100%">
            <Flex justifyContent="space-between">
              <Text
                fontSize={{ base: "1.2rem", sm: "1.5rem", md: "2rem" }}
                alignItems="center"
                py={{ base: "1rem", sm: "2rem", lg: "3rem" }}
                fontWeight="bold"
              >
                Matheus Akira Mimura
              </Text>
              <Box flexShrink={0} display={{ base: "none", sm: "block" }}>
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={profileImage}
                  alt="Minha foto"
                />
              </Box>
            </Flex>

            <Text py={1}>
              <b>Idade:</b> {age} anos
            </Text>

            <Text py={1}>
              <b>Localização:</b> São Paulo, Brasil
            </Text>

            <Text py={1}>
              <b>Profissão: </b> Analista e desenvolvedor da G4F à{" "}
              {tempoTrabalhando}
            </Text>
            <Text py={1}>
              <b>Descrição:</b> Um profissional em gestão da Tecnologia da
              Informação formado pela Fatec Barueri, com conhecimentos no
              Frontend, Backend, bancos de dados e metodologias ágeis.
            </Text>
            <Stack spacing={3} mt={3}>
              <Flex alignItems="center">
                <Icon as={FaEnvelope} mr={2} />
                <Link
                  display={{ base: "none", sm: "block" }}
                  href={`mailto:matheus.akiramimura@gmail.com`}
                  isExternal
                >
                  matheus.akiramimura@gmail.com
                </Link>
                <Link
                  display={{ base: "block", sm: "none" }}
                  href={`mailto:matheus.akiramimura@gmail.com`}
                  isExternal
                >
                  matheus.akiramimura@ gmail.com
                </Link>
              </Flex>
              <Flex alignItems="center">
                <Icon as={FaPhone} mr={2} />
                <Text>(11) 95555-9620</Text>
              </Flex>
              <Flex alignItems="center">
                <Icon as={FaGithub} mr={2} />
                <Link href="https://github.com/MatheusAkiraMimura" isExternal>
                  GitHub
                </Link>
              </Flex>
              <Flex alignItems="center">
                <Icon as={FaLinkedin} mr={2} />
                <Link
                  href="https://www.linkedin.com/in/matheus-akira-mimura-fullstack/"
                  isExternal
                >
                  LinkedIn
                </Link>
              </Flex>
            </Stack>
          </Box>
        </Flex>
      </Box>
    );
  };

  const ChatConversa: React.FC<IChatConversa> = ({}) => {
    // Função para formatar a data
    const formatDate = (date: Date) => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      if (date.toDateString() === today.toDateString()) {
        return "Hoje";
      } else if (date.toDateString() === yesterday.toDateString()) {
        return "Ontem";
      } else {
        return date.toLocaleDateString();
      }
    };

    // Função para formatar o horário
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const bgMensagem = useColorModeValue("white", "gray.700");

    const [messages, setMessages] = useState<Message[]>([]);
    const sendToIdentifier = "IDadmAkira2024_06_01";
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [recarregarMensanges, setRecarregarMensagens] = useState(false);

    // Função para rolar para o final da lista de mensagens
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };

    // Carrega as mensagens quando o componente é montado
    useEffect(() => {
      fetchMessages(setMessages);
    }, []);

    useEffect(() => {
      // Função para verificar novas mensagens
      const checkMessages = () => {
        checkForNewMessages(messages, setMessages, setRecarregarMensagens);
      };
    
      // Verifica novas mensagens a cada 5 segundos
      const interval = setInterval(checkMessages, 5000);
    
      return () => clearInterval(interval);
    }, [messages]);
    
    useEffect(() => {
      if (recarregarMensanges) {
        scrollToBottom();
        setRecarregarMensagens(false);
      }
    }, [recarregarMensanges]);
    return (
      <Box
        flex="1"
        ml={{ base: "", md: "3rem" }}
        mt={{ base: "2rem", md: "0" }}
        bg={bgMensagem}
        rounded="md"
        shadow="lg"
        p={6}
      >
        <Flex direction="column" h="100%">
          <Flex direction="column" h="100%">
            <Flex
              direction="column"
              flex="1"
              overflowY="auto"
              maxH="400px" // Altura máxima para a área de mensagens
              pe={4}
            >
              {messages.map((message, index) => {
                const showDate =
                  index === 0 ||
                  formatDate(messages[index - 1].timestamp) !==
                    formatDate(message.timestamp);
                return (
                  <React.Fragment key={message.id}>
                    {showDate && (
                      <Text align="center" fontWeight="bold" mt={4}>
                        {formatDate(message.timestamp)}
                      </Text>
                    )}
                    <Box
                      bg={message.sender === "user" ? "gray.300" : "blue.500"}
                      color={message.sender === "user" ? "black" : "white"}
                      p={3}
                      borderRadius="md"
                      maxW="80%"
                      alignSelf={
                        message.sender === "user" ? "flex-start" : "flex-end"
                      }
                      mt={3}
                      position="relative"
                    >
                      {message.text}
                    </Box>
                    <Text
                      fontSize="xs"
                      mt={0}
                      textAlign={message.sender === "me" ? "right" : "left"}
                    >
                      {formatTime(message.timestamp)}
                    </Text>
                  </React.Fragment>
                );
              })}
              <div ref={messagesEndRef} />
            </Flex>
          </Flex>
          <Box mt="auto" pt="1rem">
            <Formik
              initialValues={{ message: "" }}
              onSubmit={(values, { resetForm }) => {
                handleSendMessage(
                  values,
                  resetForm,
                  sendToIdentifier,
                  setMessages,
                  setRecarregarMensagens
                );
              }}
            >
              {({ values, handleChange }) => {
                return (
                  <Form>
                    <FormControl>
                      <Flex>
                        <Field
                          as={Input}
                          name="message"
                          placeholder="Digite sua mensagem..."
                          value={values.message}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (e.target.value.length >= 500) {
                              toast({
                                position: "top-right",
                                title: "Alerta",
                                description:
                                  "Você atingiu o limite de 500 caracteres.",
                                status: "warning",
                                duration: 3000,
                                isClosable: true,
                              });
                            } else {
                              handleChange(e);
                            }
                          }}
                          bg={bgMensagem}
                          flex="1"
                          maxLength={500}
                        />
                        <Button ml={2} colorScheme="blue" type="submit">
                          Enviar
                        </Button>
                      </Flex>
                    </FormControl>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Flex>
      </Box>
    );
  };
  //#endregion

  return (
    <ContatoContext.Provider
      value={{
        navigate,

        toast,

        savedIdentifier,

        isLoading,
        setIsLoading,

        InformacoesAkira,
        ChatConversa,
      }}
    >
      {children}
    </ContatoContext.Provider>
  );
};
/* Fim do Contexto */
