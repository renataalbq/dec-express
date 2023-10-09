import { IAluno } from "./IAluno";

export type ITurma = {
    codTurma?: number;
    ano: number;
    turma: string;
    serie: number;
    nivel: string
    listaAlunos?: Array<IAluno>;
}

export type ITurmaDTO = {
    ano: number;
    turma: string;
    serie: number;
    nivel: string
}