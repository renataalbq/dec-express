import { useLocation, useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { ConfirmationModal } from "@/components/modal-confirmation/modal-confirmation";
import { Layout } from "@/components/layout";

export function DetailStudents() {
    const navigate = useNavigate();
    const location = useLocation();
    const { aluno } = location.state;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClass = () => {
        navigate('/register-student');
    };

    const handleDeleteConfirmation = () => {
        setIsModalOpen(false);
    }

    const handleCancelDelete = () => {
        setIsModalOpen(false);
    };

    if (!aluno) {
        return <div>Aluno não encontrado</div>;
    }


    return (
        <Layout>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Aluno: {aluno.nome} </h1>
                </div>
                <div className="flex gap-6">
                    <button
                        onClick={handleEditClass}
                        className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 rounded hover:from-blue-800 hover:to-blue-500"
                    >
                        Editar Aluno
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-red-500 to-red-800 text-white px-2 rounded hover:from-red-800 hover:to-red-500"
                    >
                        <FaTrashCan />
                    </button>
                    {isModalOpen && (
                        <ConfirmationModal
                            onConfirmDelete={handleDeleteConfirmation}
                            onCancel={handleCancelDelete}
                            entityName={"o aluno"}
                            text={`${aluno.nome} ${aluno.matricula} - ${aluno.codTurma}`}
                        />
                    )}
                </div>
            </div>
            <hr className="mt-4" />

            <div className="bg-white shadow p-4 mt-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Informações do Aluno</h2>
                    </div>
                <table className="w-full mt-6">
                    <thead className="bg-black text-white">
                    <tr>
                        <th className="py-2 px-4">Nome</th>
                        <th className="py-2 px-4">Data de nascimento</th>
                        <th className="py-2 px-4">Endereço</th>
                        <th className="py-2 px-4">Telefone</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Matrícula</th>
                        <th className="py-2 px-4">Turma</th>
                    </tr>
                    </thead>
                    <tbody className="bg-gray-500 text-white text-center">
                    <tr>
                        <td className="py-2 px-4">{aluno.nome}</td>
                        <td className="py-2 px-4">{aluno.dataNascimento}</td>
                        <td className="py-2 px-4">{aluno.endereco.logradouro} - {aluno.endereco.municipio}/{aluno.endereco.uf}</td>
                        <td className="py-2 px-4">{aluno.telefone}</td>
                        <td className="py-2 px-4">{aluno.email}</td>
                        <td className="py-2 px-4">{aluno.matricula}</td>
                        <td className="py-2 px-4">{aluno.codTurma}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}