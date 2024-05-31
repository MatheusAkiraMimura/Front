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


export interface SetFunction<T> {
    (value: T): void;
}