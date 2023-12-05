export type INotas = {
    id?: number;
    professor: string;
    disciplina: string;
    matricula?: string  | null;
    nome: string;
    bimestre: number;
    nota: number;
}