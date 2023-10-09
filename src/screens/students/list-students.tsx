import { CardStudent } from "@/components/card-student/card-student";
import { Layout } from "@/components/layout";
import { Pagination } from "@/components/pagination/pagination";
import { useNavigate } from "react-router-dom";

const alunos = [
    {
        cod_aluno: 1,
        nome: "João da Silva",
        dataNascimento: "01/01/2000",
        cpf: '123456',
        rg: '123456',
        endereco: {
            cep: 12345,
            logradouro: 'rua sem saída',
            bairro: 'algum',
            numero: 123,
            uf: 'pb',
            municipio: 'joao pessoa',
            complemento: '',
        },
        telefone: "(12) 3456-7890",
        email: "joao@example.com",
        matricula: 12345,
        codTurma: 1,
        stRegistro: 1
    },
    {
        cod_aluno: 2,
        nome: "Maria Souza",
        dataNascimento: "05/05/2001",
        cpf: '123456',
        rg: '123456',
        endereco: {
            cep: 12345,
            logradouro: 'rua sem saída',
            bairro: 'algum',
            numero: 123,
            uf: 'pb',
            municipio: 'joao pessoa',
            complemento: '',
        },
        telefone: "(11) 9876-5432",
        email: "maria@example.com",
        matricula: 67890,
        codTurma: 1,
        stRegistro: 1
    },
    {
        cod_aluno: 3,
        nome: "Pedro Santos",
        dataNascimento: "10/10/2002",
        cpf: '123456',
        rg: '123456',
        endereco: {
            cep: 12345,
            logradouro: 'rua sem saída',
            bairro: 'algum',
            numero: 123,
            uf: 'pb',
            municipio: 'joao pessoa',
            complemento: '',
        },
        telefone: "(13) 5555-1234",
        email: "pedro@example.com",
        matricula: 98765,
        codTurma: 2,
        stRegistro: 1
    },
    {
        cod_aluno: 4,
        nome: "Maria Soares",
        dataNascimento: "20/10/2004",
        cpf: '123456',
        rg: '123456',
        endereco: {
            cep: 12345,
            logradouro: 'rua sem saída',
            bairro: 'algum',
            numero: 123,
            uf: 'pb',
            municipio: 'joao pessoa',
            complemento: '',
        },
        telefone: "(13) 4499-3215",
        email: "mariasoares@example.com",
        matricula: 58458,
        codTurma: 2,
        stRegistro: 1
    },
    {
        cod_aluno: 5,
        nome: "Luiza Oliveira",
        dataNascimento: "10/08/2003",
        cpf: '123456',
        rg: '123456',
        endereco: {
            cep: 12345,
            logradouro: 'rua sem saída',
            bairro: 'algum',
            numero: 123,
            uf: 'pb',
            municipio: 'joao pessoa',
            complemento: '',
        },
        telefone: "(13) 5555-1234",
        email: "luizaoliveira@example.com",
        matricula: 54594,
        codTurma: 2,
        stRegistro: 1
    },
];

export function ListStudents() {
    const navigate = useNavigate();

    const handleCreateStudent = () => {
        navigate("/register-student");
    };

    const handleDetailStudent = (aluno: any) => {
        navigate(`/detail-students/${aluno.id}`, { state: { aluno } });
    };

    return (
        <Layout>
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">Alunos</h1>
                <button
                    onClick={handleCreateStudent}
                    className="hidden sm:block bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded hover:from-blue-800 hover:to-blue-500"
                >
                    Cadastrar novo aluno
                </button>
                <button
                    onClick={handleCreateStudent}
                    className="sm:hidden bg-gradient-to-r from-blue-500 to-blue-800 text-white font-semibold px-3 py-1 rounded"
                >
                    +
                </button>
            </div>

            <div className="mt-6 space-y-4">
                {alunos.map((aluno, index) => (
                    <CardStudent
                        key={index}
                        aluno={aluno}
                        handleDetailStudents={handleDetailStudent}
                    />
                ))}
                <Pagination current={1} total={3} />
            </div>
        </Layout>
    );
}
