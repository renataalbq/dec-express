export type IAluno = {
    codTurma: number | null;
    nome: string;
    dataNascimento: string;
    cpf: string  | null;
    rg: string  | null;
    matricula: string  | null;
    telefone: string;
    email: string;
    endereco: IEndereco | null;
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
