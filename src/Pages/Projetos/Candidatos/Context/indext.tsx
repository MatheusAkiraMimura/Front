import React, {
  createContext,
  useState,
  useEffect,
  FunctionComponent,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  useToast,
  UseToastOptions,
  ToastId,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Flex,
  Heading,
  Tooltip,
  ModalCloseButton,
  Grid,
} from "@chakra-ui/react";
import {
  createCandidate as apiCreateCandidate,
  getAllCandidates,
  updateCandidate as apiUpdateCandidate,
  deleteCandidate as apiDeleteCandidate,
  generateCandidatePdf,
} from "../../../../Api/BDCandidate";

import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FaEdit, FaFilePdf, FaPlus, FaTrash } from "react-icons/fa";

interface Candidate {
  id?: string;
  name: string;
  email: string;
  celular: string;
  nascimento: string;
  profissao?: string;
  empresa_contratante?: string;
  dia_contratacao?: string;
  faculdade?: string;
  inicio_faculdade?: string;
  fim_faculdade?: string;
  identificadorUser: string;
}

interface CandidateFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues: Candidate;
  onSubmit: (values: Candidate, actions: FormikHelpers<Candidate>) => void;
}

interface CandidateContextType {
  candidates: Candidate[];
  addCandidate: (candidate: Candidate) => Promise<void>;
  updateCandidate: (id: string, candidate: Candidate) => Promise<void>;
  deleteCandidate: (id: string) => Promise<void>;
  generatePdf: (id: string) => Promise<void>;
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  openModal: (
    mode: "create" | "edit" | "delete",
    candidate?: Candidate
  ) => void;
  isFormModalOpen: boolean;
  setIsFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalMode: "create" | "edit" | "delete";
  currentCandidate: Candidate | undefined;

  CandidateNavigation: FunctionComponent<any>;
  CandidateTable: FunctionComponent<any>;
  CandidateModal: FunctionComponent<any>;
}

export const CandidateContext = createContext<CandidateContextType | null>(
  null
);

export const useCandidates = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error("useCandidates must be used within a CandidateProvider");
  }
  return context;
};

export const CandidateProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "delete">(
    "create"
  );
  const [currentCandidate, setCurrentCandidate] = useState<
    Candidate | undefined
  >(undefined);
  const navigate = useNavigate();
  const toast = useToast();

  const savedIdentifier = localStorage.getItem("userIdentifier");

  const [recarregarTabela, setRecarregarTabela] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      const resultado = await getAllCandidates();
      setCandidates(resultado.data);
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (recarregarTabela) {
      setRecarregarTabela(false);
      const fetchCandidates = async () => {
        const resultado = await getAllCandidates();
        setCandidates(resultado.data);
      };
      fetchCandidates();
    }
  }, [recarregarTabela]);

  const addCandidate = async (candidate: Candidate) => {
    try {
      if (savedIdentifier) {
        candidate.identificadorUser = savedIdentifier;
      }

      const newCandidate = await apiCreateCandidate(candidate);

      toast({
        title: "Candidato criado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setRecarregarTabela(true)
    } catch (error) {
      toast({
        title: "Erro ao criar candidato.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const updateCandidate = async (id: string, candidate: Candidate) => {
    try {
      if (savedIdentifier) {
        candidate.identificadorUser = savedIdentifier;
      }

      const updatedCandidate = await apiUpdateCandidate(id, candidate);

      toast({
        title: "Candidato atualizado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setRecarregarTabela(true)
    } catch (error) {
      toast({
        title: "Erro ao atualizar candidato.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteCandidate = async (id: string) => {
    try {
      await apiDeleteCandidate(id);
      setCandidates(candidates.filter((c) => c.id !== id));
      toast({
        title: "Candidato deletado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setRecarregarTabela(true)
    } catch (error) {
      toast({
        title: "Erro ao deletar candidato.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const generatePdf = async (id: string) => {
    try {
      await generateCandidatePdf(id);
      toast({
        title: "PDF gerado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar PDF.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openModal = (
    mode: "create" | "edit" | "delete",
    candidate?: Candidate
  ) => {
    setModalMode(mode);
    setCurrentCandidate(candidate);
    setIsFormModalOpen(true);
  };

  //#region ParcialView
  const CandidateFormSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    celular: Yup.string().required("Celular é obrigatório"),
    nascimento: Yup.date().required("Data de nascimento é obrigatória"),
    profissao: Yup.string(),
    empresa_contratante: Yup.string(),
    dia_contratacao: Yup.date(),
    faculdade: Yup.string(),
    inicio_faculdade: Yup.date(),
    fim_faculdade: Yup.date(),
  });

  const CandidateForm: React.FC<CandidateFormProps> = ({
    isOpen,
    onClose,
    initialValues,
    onSubmit,
  }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW="60rem" p={6}>
          <ModalHeader>Formulário de Candidato</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={initialValues}
              validationSchema={CandidateFormSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel htmlFor="name">Nome</FormLabel>
                      <Field as={Input} id="name" name="name" />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Field as={Input} id="email" name="email" />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={!!errors.celular && touched.celular}
                    >
                      <FormLabel htmlFor="celular">Celular</FormLabel>
                      <Field as={Input} id="celular" name="celular" />
                      <FormErrorMessage>{errors.celular}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={!!errors.nascimento && touched.nascimento}
                    >
                      <FormLabel htmlFor="nascimento">Nascimento</FormLabel>
                      <Field
                        as={Input}
                        id="nascimento"
                        name="nascimento"
                        type="date"
                      />
                      <FormErrorMessage>{errors.nascimento}</FormErrorMessage>
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="profissao">Profissão</FormLabel>
                      <Field as={Input} id="profissao" name="profissao" />
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="empresa_contratante">
                        Empresa Contratante
                      </FormLabel>
                      <Field
                        as={Input}
                        id="empresa_contratante"
                        name="empresa_contratante"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="dia_contratacao">
                        Dia de Contratação
                      </FormLabel>
                      <Field
                        as={Input}
                        id="dia_contratacao"
                        name="dia_contratacao"
                        type="date"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="faculdade">Faculdade</FormLabel>
                      <Field as={Input} id="faculdade" name="faculdade" />
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="inicio_faculdade">
                        Início da Faculdade
                      </FormLabel>
                      <Field
                        as={Input}
                        id="inicio_faculdade"
                        name="inicio_faculdade"
                        type="date"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="fim_faculdade">
                        Fim da Faculdade
                      </FormLabel>
                      <Field
                        as={Input}
                        id="fim_faculdade"
                        name="fim_faculdade"
                        type="date"
                      />
                    </FormControl>
                  </Grid>

                  <Button mt={4} colorScheme="teal" type="submit">
                    Salvar
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const CandidateModal: React.FC = () => {
    const initialValues = currentCandidate || {
      name: "",
      email: "",
      celular: "",
      nascimento: "",
      profissao: "",
      empresa_contratante: "",
      dia_contratacao: "",
      faculdade: "",
      inicio_faculdade: "",
      fim_faculdade: "",
      identificadorUser: "",
    };

    const handleSubmit = async (
      values: typeof initialValues,
      actions: FormikHelpers<typeof initialValues>
    ) => {
      if (modalMode === "create") {
        await addCandidate(values);
      } else if (modalMode === "edit" && currentCandidate) {
        await updateCandidate(currentCandidate.id!, values);
      } else if (modalMode === "delete" && currentCandidate) {
        await deleteCandidate(currentCandidate.id!);
      }
      setIsFormModalOpen(false);
      actions.setSubmitting(false);
    };

    return (
      <CandidateForm
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    );
  };

  const CandidateTable: React.FC = () => {
    const filteredCandidates = candidates.filter(
      (candidate) => candidate.identificadorUser === savedIdentifier
    );

    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Celular</Th>
            <Th>Nascimento</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredCandidates.map((candidate) => (
            <Tr key={candidate.id}>
              <Td>{candidate.name}</Td>
              <Td>{candidate.email}</Td>
              <Td>{candidate.celular}</Td>
              <Td>{new Date(candidate.nascimento).toLocaleDateString()}</Td>
              <Td>
                <IconButton
                  aria-label="Editar"
                  icon={<FaEdit />}
                  onClick={() => openModal("edit", candidate)}
                  mr={2}
                />
                <IconButton
                  aria-label="Deletar"
                  icon={<FaTrash />}
                  onClick={() => openModal("delete", candidate)}
                  mr={2}
                />
                <IconButton
                  aria-label="Gerar PDF"
                  icon={<FaFilePdf />}
                  onClick={() => generatePdf(candidate.id!)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  const CandidateNavigation: React.FC = () => {
    return (
      <Flex justifyContent="space-between" mb={4}>
        <Heading size="lg">Candidatos</Heading>
        <Tooltip label="Adicionar novo candidato">
          <Button
            leftIcon={<FaPlus />}
            colorScheme="teal"
            onClick={() => openModal("create")}
          >
            Novo Candidato
          </Button>
        </Tooltip>
      </Flex>
    );
  };

  //#endregion
  return (
    <CandidateContext.Provider
      value={{
        candidates,
        addCandidate,
        updateCandidate,
        deleteCandidate,
        generatePdf,
        setCandidates,
        openModal,
        isFormModalOpen,
        setIsFormModalOpen,
        modalMode,
        currentCandidate,

        CandidateNavigation,
        CandidateTable,
        CandidateModal,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
