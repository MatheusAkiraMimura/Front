import { FunctionComponent, createContext, useState } from "react";

import { NavigateFunction, useNavigate } from "react-router-dom";

// Chakra UI components
import { useToast, UseToastOptions, ToastId, Box, useColorModeValue } from "@chakra-ui/react";
import { SetFunction } from "../Interfaces";

//#region Interfaces
interface IInformacoesAkira {}
//#endregion

//#region types
type BuscarDadosCrudByUser = (
  id: any,
  setForms: SetFunction<any>,
  setIsFormModalOpen: SetFunction<boolean>
) => Promise<void>;

//#endregion types

//#region interface de Context type
interface CRUDContextType {
  navigate: NavigateFunction;

  toast: (options?: UseToastOptions) => ToastId;

  savedIdentifier: string | null;

  isLoading: boolean;
  setIsLoading: SetFunction<boolean>;

  // InformacoesAkira: FunctionComponent<IInformacoesAkira>;
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
  //#endregion

  //#region Tratamentos
  //#endregion

  //#region funções da index de Contato
  //#endregion

  //#region ParcialView
  const InformacoesAkira: React.FC<IInformacoesAkira> = ({}) => {
    return (
      <Box>
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
      }}
    >
      {children}
    </CRUDContext.Provider>
  );
};
/* Fim do Contexto */
