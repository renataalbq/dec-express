import { IAluno } from "./IAluno";

export type ITurma = {
    codTurma?: number;
    ano: number;
    turma: string;
    serie: string;
    nivel: string
    listaAlunos?: Array<IAluno>;
}