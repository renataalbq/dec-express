import { useLocation, useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { BiSearch } from "react-icons/bi";
import { Pagination } from "@/components/pagination/pagination";
import { useState } from "react";
import { ConfirmationModal } from "@/components/modal-confirmation/modal-confirmation";
import { Layout } from "@/components/layout";
import { nivel_format } from "@/utils/nivel-formatter";
import useDeleteClass from "@/hooks/use-delete-class";

export function InfoClass() {
    const navigate = useNavigate();
    const location = useLocation();
    const { turma } = location.state;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { deleteClass, error } = useDeleteClass();
    
    const handleEditClass = (turma: any) => {
		  navigate(`/register-class/${turma.codTurma}`, { state: { turma }});
	  };

    const handleDeleteConfirmation = async () => {
      await deleteClass(turma.codTurma);
      setIsModalOpen(false);
      if (!error) {
        navigate('/list-class');
      }
    }

    const handleCancelDelete = () => {
      setIsModalOpen(false);
    };

    if (!turma) {
      return <div>Turma não encontrada</div>;
    }
  

  return (
    <Layout>
          <div className="flex justify-between">
            <div>
            <h1 className="text-2xl font-semibold">Turma: {turma.serie}º Ano {turma.turma} - {nivel_format(turma.nivel)}</h1>
            <p className="text-sm text-neutral-500">Informações da turma: {turma.serie}º Ano {turma.turma} - {nivel_format(turma.nivel)} ({turma.ano})</p>
            </div>
            <div className="flex gap-6 mb-4">
              <button onClick={() => handleEditClass(turma)} className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 rounded hover:from-blue-800 hover:to-blue-500">
                Editar Turma
              </button>
              <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-red-500 to-red-800 text-white px-2 rounded hover:from-red-800 hover:to-red-500">
                <FaTrashCan />
              </button>
              {isModalOpen && (
                <ConfirmationModal
                  onConfirmDelete={handleDeleteConfirmation}
                  onCancel={handleCancelDelete}
                  entityName={"a turma"}
                  text={`${turma.serie}º Ano ${turma.turma} - ${nivel_format(turma.nivel)}`}
                />
              )}
            </div>
          </div>
          <hr className="mt-4" />

          <div className="bg-white shadow p-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Alunos da turma</h2>
              <div className="relative">
                <input
                  type="text"
                  className="bg-gray-200 text-gray-800 border rounded-md pl-4 pr-8 w-96 py-2"
                  placeholder="Buscar aluno (nome, matrícula ou CPF)"
                />
                <span className="absolute top-1/2 right-2 transform -translate-y-1/2">
                  <BiSearch />
                </span>
              </div>
            </div>

            <table className="w-full mt-6">
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-2 px-4">Nome</th>
                  <th className="py-2 px-4">Data de Nascimento</th>
                  <th className="py-2 px-4">Telefone</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Matrícula</th>
                </tr>
              </thead>
              <tbody className="bg-gray-500 text-white text-center">
                {Array.from({ length: 8 }).map((_, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">Nome do Aluno</td>
                    <td className="py-2 px-4">01/01/2000</td>
                    <td className="py-2 px-4">(12) 3456-7890</td>
                    <td className="py-2 px-4">aluno@escola.com</td>
                    <td className="py-2 px-4">12345</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination current={1} total={5} />
          </div>
    </Layout>
  );
}