import {
  FunctionComponent,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SetFunction } from "../../../../Interfaces";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";

// Chakra UI components
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Box,
  FormErrorMessage,
  useToast,
  Grid,
  IconButton,
  Textarea,
  Checkbox,
  Select,
  Stack,
  RadioGroup,
  Radio,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Tooltip,
  VStack,
  Spinner,
  UseToastOptions,
  ToastId,
  useColorMode,
} from "@chakra-ui/react";

import {
  BDCreateCRUD,
  BDDeleteByCrudId,
  BDGetAllCRUDuserId,
  BDGetByCrudId,
  BDUpdateByCrudId,
} from "../../../../Api/bancoDados";
import NavEntreProjetos from "../../../../Components/NavEntreProjetos";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import { Field, Form, Formik, FormikProps } from "formik";
// Yup for validation
import * as Yup from "yup";
import { mascaraCelular } from "../../../../Utils";
import Paginacao from "../../../../Components/Paginacao";
import { TabelaCustomizadaComProvider } from "../../../../Components/Tabela";

//#region Interfaces
interface ColunaTabela {
  titulo: string;
  chave: string;
}

interface FormState {
  nome: string;
  email: string;
  data_campo: string;
  celular: string;
  classificacao: string;
  observacao: string;
  conhecimentos: string[];
  nivel: string;
}

interface DadosTabelaFormatadosAPICrud {
  nome: { dados: string };
  email: { dados: string };
  data_campo: { dados: string };
  celular: { dados: string };
  classificacao: { dados: string };
  observacao: { dados: string };
  conhecimentos: { dados: string };
  nivel: { dados: string };
  botoesAlterarDeletar: {
    id: number;
  };
}

interface IDadosAPICrud {
  identificadorUser: any;
  id: number;
  nome: string;
  email: string;
  data_campo: string;
  celular: string;
  classificacao: string;
  observacao: string;
  conhecimentos: string;
  nivel: string;
  userId: number;
}

interface INavegacaoCrud {
  setForms: SetFunction<FormState>;
  setIsFormModalOpen: SetFunction<boolean>;
  setModalMode: SetFunction<"create" | "edit" | "delete">;
}

interface IModalCrud {
  isFormModalOpen: boolean;
  setIsFormModalOpen: SetFunction<boolean>;
  modalMode: "create" | "edit" | "delete";
  forms: FormState;
  setShowModal: SetFunction<boolean>;
  setRecarregarTabela: SetFunction<boolean>;
  idCrud: any;
}

interface ITabelaCrud {
  recarregarTabela: boolean;
  idCrud: any;
  setIdCrud: SetFunction<any>;
  setForms: SetFunction<FormState>;
  setIsFormModalOpen: SetFunction<boolean>;
  setModalMode: SetFunction<"create" | "edit" | "delete">;
  setRecarregarTabela: SetFunction<boolean>;
  setTerminouEnviar: SetFunction<boolean>;
}
//#endregion

//#region types
type BuscarDadosCrudByUser = (
  id: any,
  setForms: SetFunction<FormState>,
  setIsFormModalOpen: SetFunction<boolean>
) => Promise<void>;

type OpenModal = (
  mode: "create" | "edit" | "delete",
  setForms: SetFunction<FormState>,
  setIsFormModalOpen: SetFunction<boolean>,
  setModalMode: SetFunction<"create" | "edit" | "delete">,
  id?: string
) => void;

type EnviarFormulario = (
  values: any,
  setShowModal: SetFunction<boolean>,
  modalMode: "create" | "edit" | "delete",
  idCrud: any,
  setRecarregarTabela: SetFunction<boolean>,
  setIsFormModalOpen: SetFunction<boolean>
) => Promise<void>;

type BuscarAllDadosCrudByUser = (
  setDadosTabela: SetFunction<any>,
  setForms: SetFunction<FormState>,
  setRecarregarTabela: SetFunction<boolean>
) => Promise<void>;
//#endregion types

//#region interface de Context type
interface CRUDContextType {
  navigate: NavigateFunction;

  toast: (options?: UseToastOptions) => ToastId;

  savedIdentifier: string | null;

  isLoading: boolean;
  setIsLoading: SetFunction<boolean>;

  colunasTabela: ColunaTabela[];

  buscarDadosCrudByUser: BuscarDadosCrudByUser;
  openModal: OpenModal;
  enviarFormulario: EnviarFormulario;
  buscarAllDadosCrudByUser: BuscarAllDadosCrudByUser;

  NavegacaoCrud: FunctionComponent<INavegacaoCrud>;
  ModalCrud: FunctionComponent<IModalCrud>;
  TabelaCrud: FunctionComponent<ITabelaCrud>;
}
//#endregion interface de Context type

export const CRUDContext = createContext<CRUDContextType | null>(null);

export const CRUDProvider: React.FC<{ children: React.ReactNode }> = ({
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
  const colunasTabela: ColunaTabela[] = [
    {
      titulo: "Nome",
      chave: "nome",
    },
    {
      titulo: "Observacao",
      chave: "observacao",
    },
    {
      titulo: "E-mail",
      chave: "email",
    },
    {
      titulo: "Data ",
      chave: "data_campo",
    },
    {
      titulo: "Celular",
      chave: "celular",
    },
    {
      titulo: "Nível",
      chave: "nivel",
    },
    {
      titulo: "Classificacao",
      chave: "classificacao",
    },
    {
      titulo: "Conhecimentos",
      chave: "conhecimentos",
    },
    {
      titulo: "",
      chave: "botoesAlterarDeletar",
    },
  ];
  //#endregion

  //#region Tratamentos
  const tratarDadosAPICrud = (
    dadosApi: IDadosAPICrud[]
  ): DadosTabelaFormatadosAPICrud[] => {
    return dadosApi
      .filter((item) => item.identificadorUser === savedIdentifier)
      .map((item) => ({
        id: { dados: item.id },
        nome: { dados: item.nome },
        email: { dados: item.email },
        data_campo: {
          dados: new Date(item.data_campo).toLocaleDateString("pt-BR"),
        },
        celular: { dados: item.celular },
        classificacao: { dados: item.classificacao },
        observacao: { dados: item.observacao },
        conhecimentos: { dados: item.conhecimentos },
        nivel: { dados: item.nivel },
        botoesAlterarDeletar: {
          id: item.id,
        },
      }));
  };

  //#endregion

  //#region funções da index de CRUD
  const buscarDadosCrudByUser: BuscarDadosCrudByUser = async (
    id,
    setForms,
    setIsFormModalOpen
  ) => {
    try {
      const dadosApi = await BDGetByCrudId(id);

      const dadosTratados = dadosApi.data;

      if (dadosTratados) {
        setForms({
          nome: dadosTratados.nome,
          email: dadosTratados.email,
          data_campo: new Date(dadosApi.data.data_campo)
            .toISOString()
            .split("T")[0],
          celular: dadosTratados.celular,
          classificacao: dadosTratados.classificacao,
          observacao: dadosTratados.observacao,
          conhecimentos: dadosTratados.conhecimentos.split(","),
          nivel: dadosTratados.nivel,
        });
      }

      setIsFormModalOpen(true);
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Ocorreu um erro na busca de dados.";
      toast({
        title: "Erro",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const openModal: OpenModal = (
    mode,
    setForms,
    setIsFormModalOpen,
    setModalMode,
    id
  ) => {
    setModalMode(mode);
    if (id !== "") {
      buscarDadosCrudByUser(id, setForms, setIsFormModalOpen);
    } else if (id === "") {
      setForms({
        nome: "",
        email: "",
        data_campo: "",
        celular: "",
        classificacao: "",
        observacao: "",
        conhecimentos: [],
        nivel: "",
      });
      setIsFormModalOpen(true);
    }
  };

  const enviarFormulario: EnviarFormulario = async (
    values,
    setShowModal,
    modalMode,
    idCrud,
    setRecarregarTabela,
    setIsFormModalOpen
  ) => {
    setShowModal(true);
    try {
      values.identificadorUser = savedIdentifier;

      if (Array.isArray(values.conhecimentos)) {
        values.conhecimentos = values.conhecimentos.join(",");
      }

      if (modalMode == "edit") {
        await BDUpdateByCrudId(idCrud, values);
      } else if (modalMode == "delete") {
        await BDDeleteByCrudId(idCrud);
      } else {
        await BDCreateCRUD(values);
      }

      if (modalMode == "edit") {
        toast({
          title: "CRUD alterado com sucesso",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      } else if (modalMode == "delete") {
        toast({
          title: "CRUD deletado com sucesso",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "CRUD criado com sucesso",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Ocorreu no envio do formulário.";

      setRecarregarTabela(true);

      toast({
        title: "Erro ao criar CRUD.",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setRecarregarTabela(true);
      setIsFormModalOpen(false);
    }
  };

  const buscarAllDadosCrudByUser: BuscarAllDadosCrudByUser = async (
    setDadosTabela,
    setForms,
    setRecarregarTabela
  ) => {
    try {
      const dadosApi = await BDGetAllCRUDuserId();

      if (dadosApi.data.length > 0) {
        setDadosTabela(tratarDadosAPICrud(dadosApi.data));
      } else {
        setDadosTabela([]);
      }

      setForms({
        nome: "",
        email: "",
        data_campo: "",
        celular: "",
        classificacao: "",
        observacao: "",
        conhecimentos: [],
        nivel: "",
      });

      setRecarregarTabela(false);
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Ocorreu um erro na busca de dados.";
      toast({
        title: "Erro",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  //#endregion

  //#region ParcialView
  const NavegacaoCrud: React.FC<INavegacaoCrud> = ({
    setForms,
    setIsFormModalOpen,
    setModalMode,
  }) => {
    const [userName, setUserName] = useState("");

    useEffect(() => {
      if (savedIdentifier) {
        const [savedName] = savedIdentifier.split("-");
        setUserName(savedName);
      }
    }, []);
    return (
      <NavEntreProjetos
        rota="projetos"
        textoIconButton="Voltar para Projetos"
        textoButton="Projetos"
        botaoDireita={true}
      >
        <Heading ml={8} size="lg">
          <Text display={{ base: "none", md: "block" }}>
            Create Read Update Delete
          </Text>

          <Text fontSize="1.6rem" align="center" >{userName}</Text>

          <Text display={{ base: "block", md: "none" }}>CRUD</Text>
        </Heading>

        <Tooltip label="Adicionar novo CRUD" aria-label="Dica de navegação">
          <Button
            leftIcon={<FaPlus />}
            onClick={() => {
              openModal(
                "create",
                setForms,
                setIsFormModalOpen,
                setModalMode,
                ""
              );
            }}
            size="lg"
            colorScheme="teal"
            _hover={{ transform: "scale(1.1)" }}
            ml={8}
          >
            <Box pl=".5rem" display={{ base: "none", sm: "block" }}>
              CRUD
            </Box>
          </Button>
        </Tooltip>
      </NavEntreProjetos>
    );
  };

  const ModalCrud: React.FC<IModalCrud> = ({
    isFormModalOpen,
    setIsFormModalOpen,
    modalMode,
    forms,
    setShowModal,
    setRecarregarTabela,
    idCrud,
  }) => {
    const ProfileSchema = Yup.object().shape({
      nome: Yup.string()
        .required("Campo obrigatório")
        .min(2, "Muito curto!")
        .max(50, "Muito longo!"),
      email: Yup.string().email("Email inválido").required("Campo obrigatório"),
      data_campo: Yup.date().required("Data é obrigatória"),
      celular: Yup.string()
        .matches(/\(\d{2}\) \d{4,5}-\d{4}/, "Número de celular inválido")
        .required("Número de celular é obrigatório"),
      classificacao: Yup.string().required("Seleção é obrigatória"),
      observacao: Yup.string().required("Texto é obrigatório"),
      conhecimentos: Yup.array()
        .min(1, "Pelo menos uma opção deve ser selecionada")
        .required("Seleção é obrigatória"),
      nivel: Yup.string().required("Uma opção deve ser selecionada"),
    });

    return (
      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}>
        <ModalOverlay />
        <ModalContent maxW="60rem" p={6}>
          <ModalHeader>
            <Flex justifyContent="space-between">
              {modalMode === "create"
                ? "Criar Novo"
                : modalMode === "edit"
                ? "Editar"
                : "Deletar"}{" "}
              CRUD
              <Tooltip label="Fechar" placement="right-start">
                <IconButton
                  icon={<FaTimes fontSize="1.5rem" />}
                  colorScheme="red"
                  mr={3}
                  onClick={() => setIsFormModalOpen(false)}
                  aria-label="Fechar"
                />
              </Tooltip>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={forms}
              validationSchema={ProfileSchema}
              onSubmit={(values) => {
                enviarFormulario(
                  values,
                  setShowModal,
                  modalMode,
                  idCrud,
                  setRecarregarTabela,
                  setIsFormModalOpen
                );
              }}
              enableReinitialize
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form>
                  <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr" }} gap={6}>
                    <FormControl isInvalid={!!errors.nome && touched.nome}>
                      <FormLabel htmlFor="nome">Nome</FormLabel>
                      <Field
                        as={Input}
                        id="nome"
                        name="nome"
                        disabled={modalMode == "delete"}
                      />

                      <FormErrorMessage>{errors.nome}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <FormLabel htmlFor="email">Campo de email</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        autoComplete="email"
                        disabled={modalMode == "delete"}
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>

                    {/* Campo de Data */}
                    <FormControl
                      isInvalid={!!errors.data_campo && touched.data_campo}
                    >
                      <FormLabel htmlFor="data_campo">Campo de Data</FormLabel>
                      <Field
                        as={Input}
                        type="date"
                        id="data_campo"
                        name="data_campo"
                        disabled={modalMode == "delete"}
                      />
                      <FormErrorMessage>{errors.data_campo}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={!!errors.celular && touched.celular}
                    >
                      <FormLabel htmlFor="celular">Celular</FormLabel>
                      <Field name="celular">
                        {({
                          field,
                          form,
                        }: {
                          field: any;
                          form: FormikProps<FormState>;
                        }) => (
                          <Input
                            {...field}
                            id="celular"
                            type="tel"
                            onChange={(e) => {
                              const mascarado = mascaraCelular(e.target.value);
                              form.setFieldValue("celular", mascarado);
                            }}
                            disabled={modalMode == "delete"}
                          />
                        )}
                      </Field>
                      <FormErrorMessage>{errors.celular}</FormErrorMessage>
                    </FormControl>

                    {/* Campo de Seleção */}
                    <FormControl
                      isInvalid={
                        !!errors.classificacao && touched.classificacao
                      }
                    >
                      <FormLabel htmlFor="classificacao">
                        Classificação
                      </FormLabel>
                      <Field
                        as={Select}
                        id="classificacao"
                        name="classificacao"
                        disabled={modalMode == "delete"}
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Fullstack">Fullstack</option>
                        {/* Adicione mais opções conforme necessário */}
                      </Field>
                      <FormErrorMessage>
                        {errors.classificacao}
                      </FormErrorMessage>
                    </FormControl>

                    {/* Campo de Textarea */}
                    <FormControl
                      isInvalid={!!errors.observacao && touched.observacao}
                      gridColumn={{ md: "span 2" }}
                    >
                      <FormLabel htmlFor="observacao">Observação </FormLabel>
                      <Field
                        as={Textarea}
                        id="observacao"
                        name="observacao"
                        disabled={modalMode == "delete"}
                      />
                      <FormErrorMessage>{errors.observacao}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        !!(errors.conhecimentos && touched.conhecimentos)
                      }
                    >
                      <FormLabel htmlFor="conhecimentos">
                        Conhecimentos
                      </FormLabel>
                      <Stack
                        spacing={5}
                        direction={{ base: "column", sm: "row" }}
                      >
                        {["React", "Angular", "Laravel"].map(
                          (checkboxValue, index) => (
                            <Field name="conhecimentos" key={index}>
                              {({ field }: any) => (
                                <Checkbox
                                  {...field}
                                  value={checkboxValue}
                                  isChecked={field.value.includes(
                                    checkboxValue
                                  )}
                                  onChange={(e) => {
                                    if (modalMode != "delete") {
                                      if (e.target.checked) {
                                        setFieldValue("conhecimentos", [
                                          ...field.value,
                                          checkboxValue,
                                        ]);
                                      } else {
                                        setFieldValue(
                                          "conhecimentos",
                                          field.value.filter(
                                            (value: any) =>
                                              value !== checkboxValue
                                          )
                                        );
                                      }
                                    }
                                  }}
                                  isDisabled={modalMode == "delete"}
                                >
                                  {checkboxValue}
                                </Checkbox>
                              )}
                            </Field>
                          )
                        )}
                      </Stack>
                      {errors.conhecimentos && touched.conhecimentos && (
                        <FormErrorMessage>
                          {errors.conhecimentos}
                        </FormErrorMessage>
                      )}
                    </FormControl>

                    <FormControl
                      isInvalid={!!errors.nivel && touched.nivel}
                      gridColumn={{ md: "span 2" }}
                    >
                      <FormLabel htmlFor="nivel">Nível</FormLabel>
                      <RadioGroup
                        key={forms.nivel}
                        name="nivel"
                        value={values.nivel}
                        onChange={(val) => {
                          if (modalMode != "delete") {
                            setFieldValue("nivel", val);
                          }
                        }}
                        isDisabled={modalMode == "delete"}
                      >
                        <Stack
                          spacing={5}
                          direction={{ base: "column", sm: "row" }}
                        >
                          <Field
                            as={Radio}
                            value="Estagiário"
                            name="nivel"
                            disabled={modalMode == "delete"}
                          >
                            Estagiário
                          </Field>
                          <Field
                            as={Radio}
                            value="Traine"
                            name="nivel"
                            disabled={modalMode == "delete"}
                          >
                            Traine
                          </Field>
                          <Field
                            as={Radio}
                            value="Júnior"
                            name="nivel"
                            disabled={modalMode == "delete"}
                          >
                            Júnior
                          </Field>
                          <Field
                            as={Radio}
                            value="Pleno"
                            name="nivel"
                            disabled={modalMode == "delete"}
                          >
                            Pleno
                          </Field>
                          <Field
                            as={Radio}
                            value="Sênior"
                            name="nivel"
                            disabled={modalMode == "delete"}
                          >
                            Sênior
                          </Field>
                        </Stack>
                      </RadioGroup>
                      <FormErrorMessage>{errors.nivel}</FormErrorMessage>
                    </FormControl>

                    <FormControl my={4}>
                      <Button
                        gridColumn={{ md: "span 2" }}
                        w="100%"
                        type="submit"
                        colorScheme={modalMode === "delete" ? "red" : "teal"}
                      >
                        {modalMode === "create"
                          ? "Salvar"
                          : modalMode === "edit"
                          ? "Atualizar"
                          : "Deletar"}
                      </Button>
                    </FormControl>
                  </Grid>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const TabelaCrud: React.FC<ITabelaCrud> = ({
    recarregarTabela,
    idCrud,
    setIdCrud,
    setForms,
    setIsFormModalOpen,
    setModalMode,
    setRecarregarTabela,
    setTerminouEnviar,
  }) => {
    const { colorMode } = useColorMode();

    const [dadosTabela, setDadosTabela] = useState<
      DadosTabelaFormatadosAPICrud[]
    >([]);

    const [termoPesquisa, setTermoPesquisa] = useState("");
    const [isInputVisible, setIsInputVisible] = useState(false);

    const dadosFiltrados = dadosTabela.filter(
      (item) =>
        item.nome.dados.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        item.email.dados.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        item.observacao.dados
          .toLowerCase()
          .includes(termoPesquisa.toLowerCase()) ||
        item.data_campo.dados
          .toLowerCase()
          .includes(termoPesquisa.toLowerCase()) ||
        item.celular.dados
          .toLowerCase()
          .includes(termoPesquisa.toLowerCase()) ||
        item.nivel.dados.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        item.classificacao.dados
          .toLowerCase()
          .includes(termoPesquisa.toLowerCase()) ||
        item.conhecimentos.dados
          .toLowerCase()
          .includes(termoPesquisa.toLowerCase())
    );

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(5);

    const indexDoUltimoItem = paginaAtual * itensPorPagina;
    const indexDoPrimeiroItem = indexDoUltimoItem - itensPorPagina;

    const itensAtuais = dadosFiltrados.slice(
      indexDoPrimeiroItem,
      indexDoUltimoItem
    );

    // UseEffect
    const closeTimer = useRef<NodeJS.Timeout | number | null>(null);
    const animStyles = useSpring({
      width: isInputVisible ? "200px" : "0px",
      opacity: isInputVisible ? 1 : 0,
      config: { duration: 500 },
    });

    const handleMouseOver = () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current as NodeJS.Timeout);
        closeTimer.current = null;
      }
      setIsInputVisible(true);
    };

    const handleMouseLeave = () => {
      if (!termoPesquisa) {
        closeTimer.current = setTimeout(() => {
          setIsInputVisible(false);
        }, 1500); // 500ms delay before closing
      }
    };

    const handleInputBlur = () => {
      if (!termoPesquisa) {
        setIsInputVisible(false);
      }
    };

    useEffect(() => {
      return () => {
        if (closeTimer.current) {
          clearTimeout(closeTimer.current as NodeJS.Timeout);
        }
      };
    }, []);

    useEffect(() => {
      if (dadosFiltrados.length > 0 && paginaAtual != 1) {
        setPaginaAtual(1);
      }
    }, [termoPesquisa, dadosFiltrados.length]);

    useEffect(() => {
      buscarAllDadosCrudByUser(setDadosTabela, setForms, setRecarregarTabela);
    }, []);

    useEffect(() => {
      if (recarregarTabela) {
        buscarAllDadosCrudByUser(setDadosTabela, setForms, setRecarregarTabela);

        setTerminouEnviar(true);
      }
    }, [recarregarTabela]);

    useEffect(() => {
      setRecarregarTabela(true);
    }, [colorMode]);

    return (
      <Box w="100%" maxW="98rem" margin="1rem auto">
        <Flex justifyContent="flex-end" mb={2} me=".2rem">
          <Box display="inline-flex" alignItems="center">
            <animated.div style={animStyles}>
              <Input
                placeholder="Pesquisar..."
                value={termoPesquisa}
                onChange={(e) => setTermoPesquisa(e.target.value)}
                onBlur={handleInputBlur}
                onFocus={() => setIsInputVisible(true)}
                onClick={handleMouseOver}
              />
            </animated.div>
            <Tooltip label="Pesquisa" hasArrow>
              <IconButton
                aria-label="Pesquisar"
                icon={<FaSearch fontSize="1.5rem" />}
                onClick={() => setIsInputVisible(true)}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                px={3}
                ms={2}
              />
            </Tooltip>
          </Box>
        </Flex>

        {!recarregarTabela ? (
          <>
            <TabelaCustomizadaComProvider
              colunas={colunasTabela}
              linhas={itensAtuais}
              navigate={navigate}
              linhaDestaque={idCrud}
              abriModalAlterar={(idSelecionado) => {
                setIdCrud(idSelecionado);
                openModal(
                  "edit",
                  setForms,
                  setIsFormModalOpen,
                  setModalMode,
                  idSelecionado
                );
              }}
              abrirModalDeletar={(idSelecionado) => {
                setIdCrud(idSelecionado);
                openModal(
                  "delete",
                  setForms,
                  setIsFormModalOpen,
                  setModalMode,
                  idSelecionado
                );
              }}
            />

            <Paginacao
              itensTotais={dadosFiltrados.length}
              itensPorPagina={itensPorPagina}
              paginaAtual={paginaAtual}
              mudarPagina={(numeroDaPagina) => setPaginaAtual(numeroDaPagina)}
            />
          </>
        ) : (
          <VStack>
            <Spinner
              style={{ width: "105px", height: "105px" }}
              color="blue.500"
            />
            <Text mt={3} fontSize="xl">
              Carregando...
            </Text>
          </VStack>
        )}
      </Box>
    );
  };

  //#endregion

  return (
    <CRUDContext.Provider
      value={{
        navigate,

        toast,

        savedIdentifier,

        isLoading,
        setIsLoading,

        colunasTabela,

        buscarDadosCrudByUser,
        openModal,
        enviarFormulario,
        buscarAllDadosCrudByUser,

        NavegacaoCrud,
        ModalCrud,
        TabelaCrud,
      }}
    >
      {children}
    </CRUDContext.Provider>
  );
};
/* Fim do Contexto */
