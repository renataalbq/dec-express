export type IAluno = {
    cod_aluno: number;
    codTurma: number;
    nome: string;
    dataNascimento: string;
    cpf: string;
    rg: string;
    matricula: number;
    telefone: string;
    email: string;
    endereco: IEndereco;
    stRegistro: number;
}

export type IEndereco = {
    cep: number;
    logradouro: string;
    bairro: string;
    numero: number;
    uf: string;
    municipio: string;
    complemento: string;
}
