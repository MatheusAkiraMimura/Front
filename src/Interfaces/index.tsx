import { useToast } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";

// Tabelas
export interface Coluna {
    titulo: string;
    chave: string;
    classes?: string
}

// Menu Opções
export interface ITiposOpcoes {
    titulo: string;
    value: string;
    iconCount: number;
    bgGradientEnabled: string;
    textColorEnabled: string;
    iconColorEnabled: string;
};

// Linhas Tabela
export interface IRetornoPadraoTabela {
    dados: any;
}

export interface IRetornoBotoesAlterarDeletar {
    id: string;
    abriModalAlterar?: (idSelecionado: any) => void; 
    abrirModalDeletar?: (idSelecionado: any) => void; 
}

export interface IRetornoBotaoSenha {
    id: string;
    idUser: string;
    page: string;
    abrirModalValidarSenha?: (idSelecionado: any) => void; 
}


// CRUD
export interface IDadosAPICrud {
    id: number;
    nome: string;
    email: string;
    senha: string;
    dataCampo: string;
    celular: string;
    classificacao: string;
    observacao: string;
    conhecimentos: string;
    nivel: string;
    userId: number;
}

export interface DadosTabelaFormatadosAPICrud {
    id: { dados: number };
    nome: { dados: string };
    email: { dados: string };
    senha: {
        id: number,
        idUser: number,
        page: string,
    }
    dataCampo: { dados: string };
    celular: { dados: string };
    classificacao: { dados: string };
    observacao: { dados: string };
    conhecimentos: { dados: string };
    nivel: { dados: string };
    userId: { dados: number };
    botoesAlterarDeletar: {
        id: number,
    }
}

