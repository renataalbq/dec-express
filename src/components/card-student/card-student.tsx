import { IAluno } from "@/model/IAluno";
import { CardItem } from "../card-item/card-item";
import { toCapitalize } from "@/utils/capitalize-formatter";

interface CardStudentProps {
    aluno: IAluno;
    handleDetailStudents: (aluno: IAluno) => void;
}

const CardStudent = (props: CardStudentProps) => (
    <div className="bg-white rounded shadow-md p-4 sm:flex sm:flex-col">
        <div className="flex flex-wrap justify-between">
            <div className="w-1/5">
                <CardItem label="Nome" value={toCapitalize(props.aluno.nome)} />
            </div>
            <div className="w-1/5">
                <CardItem label="Matrícula" value={props.aluno.matricula ? props.aluno.matricula : ''} />
            </div>
            <div className="w-1/5">
                <CardItem label="Email" value={props.aluno.email.toLowerCase()} />
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