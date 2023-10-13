import { BiError } from 'react-icons/bi';

interface ErrorProps {
    error: string
}

const ErrorPlaceholder = (props: ErrorProps) => {
  return (
    <div className="grid min-h-full place-items-center shadow-md p-2 bg-white rounded-lg px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col justify-center text-center items-center">
            <BiError style={{ color: 'red', fontSize: '60px',  }}  />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Falha no carregamento</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">{props.error}. Tente acessar a página novamente.</p>
        </div>
    </div>
  );
};

export default ErrorPlaceholder;