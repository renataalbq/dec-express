import { ITurmaDTO } from "./ITurma";

export type IAluno = {
    nome: string;
    dataNascimento: string;
    cpf?: string  | null;
    rg?: string  | null;
    matricula?: string  | null;
    telefone: string;
    email: string;
    endereco?: IEndereco | null;
    turma?: ITurmaDTO | null;
}

export type IEndereco = {
    cep: number;
    logradouro: string;
    bairro: string;
    numero: string;
    uf: string;
    municipio: string;
    complemento: string;
}

export type IAlunoDTO = {
    nome: string;
    dataNascimento: string;
    cpf: string  | null;
    rg: string  | null;
    telefone: string;
    email: string;
    endereco: IEndereco | null;
    turma?: ITurmaDTO | null;
}