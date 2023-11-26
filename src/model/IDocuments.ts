export type IDocuments = {
    [key: string]: any;
    data_solicitacao: string;
    data_validade: string;
    tipo: string  | null;
    matricula?: string  | null;
    cpf: string;
    nome_aluno: string;
}