import { BsFillXCircleFill } from "react-icons/bs";

const NoClassPlaceholder = () => {
  return (
    <div className="grid min-h-full place-items-center shadow-md p-2 bg-white rounded-lg px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col justify-center text-center items-center">
            <BsFillXCircleFill style={{ color: 'red', fontSize: '60px',  }}  />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Aluno sem turma</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Você não foi alocado em nenhuma turma. Se ainda não solicitou, entre em contato com a coordenação.</p>
        </div>
    </div>
  );
};

export default NoClassPlaceholder;