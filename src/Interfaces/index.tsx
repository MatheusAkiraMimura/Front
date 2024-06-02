
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

export interface SetFunction<T> {
    (value: T): void;
}