import { IAluno } from "./IAluno";

export type ITurma = {
    codTurma?: number;
    ano: number;
    turma: string;
    serie: number;
    nivel: string
    listaAlunos?: Array<IAluno> | null;
}

export type ITurmaDTO = {
    ano: number;
    turma: string;
    serie: number;
    nivel: string
}