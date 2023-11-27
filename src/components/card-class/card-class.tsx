import { ITurma } from "@/model/ITurma";
import { CardItem } from "../card-item/card-item";
import { nivel_format } from "@/utils/nivel-formatter";

interface CardClassProps {
    turma: ITurma;
    handleInfoClass: (turma: ITurma) => void
}


const CardClass = (props: CardClassProps) => (
    <div className="bg-white rounded shadow-md p-4 sm:flex sm:flex-col">
      <div className="flex flex-wrap justify-between">
        <div className="w-1/5">
          <CardItem label="Série" value={`${props.turma.serie}º ano`} />
        </div>
        <div className="w-1/5">
          <CardItem label="Turma" value={props.turma.turma.toUpperCase()} />
        </div>
        <div className="w-1/5">
          <CardItem label="Nível" value={nivel_format(props.turma.nivel)} />
        </div>
        <div className="w-1/5">
          <CardItem label="Ano" value={props.turma.ano} />
        </div>
        <div className="mt-2">
          <button
            onClick={() => props.handleInfoClass(props.turma)}
            className="text-blue-500 font-semibold px-3 py-1 rounded"
          >
            Ver Informações
          </button>
        </div>
      </div>
    </div>
  );
  
  export { CardClass };