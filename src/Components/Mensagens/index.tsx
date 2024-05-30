import { useToast } from "@chakra-ui/react";

export const MostrarMensagemErro = (mensagem: string) => {
    const toast = useToast();

    toast({
      title: 'Erro',
      description: mensagem,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };