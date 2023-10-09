export type IAluno = {
    codTurma: number;
    nome: number;
    dataNascimento: string;
    cpf: string;
    rg: string;
    matricula: number;
    telefone: string;
    email: string;
    endereco: IEndereco;
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
