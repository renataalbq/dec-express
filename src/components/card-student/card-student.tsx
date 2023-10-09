import { IAluno } from "@/model/IAluno";
import { CardItem } from "../card-item/card-item";

interface CardStudentProps {
    aluno: IAluno;
    handleDetailStudents: (aluno: IAluno) => void;
}

const CardStudent = (props: CardStudentProps) => (
    <div className="bg-white rounded shadow-md p-4 sm:flex sm:flex-col">
        <div className="flex justify-between">
            <div>
                <CardItem label="Nome" value={props.aluno.nome} />
            </div>
            <div>
                <CardItem label="Matrícula" value={props.aluno.matricula} />
            </div>
            <div>
                <CardItem label="turma" value={props.aluno.codTurma} />
            </div>
            <div className="mt-2">
                <button
                    onClick={() => props.handleDetailStudents(props.aluno)}
                    className="text-blue-500 font-semibold px-3 py-1 rounded"
                >
                    Ver Informações
                </button>
            </div>
        </div>
    </div>
);

export { CardStudent };