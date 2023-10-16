import { useLocation, useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { ConfirmationModal } from "@/components/modal-confirmation/modal-confirmation";
import { Layout } from "@/components/layout";
import useDeleteStudents from "@/hooks/use-delete-student";

export function DetailStudents() {
  const navigate = useNavigate();
  const location = useLocation();
  const { aluno } = location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteStudents, error } = useDeleteStudents();

  const handleEditStudent = (aluno: any) => {
    navigate(`/register-student/${aluno.matricula}`, {state: { aluno }});
  };

  const handleDeleteConfirmation = async () => {
    await deleteStudents(aluno.matricula);
    setIsModalOpen(false);
    if (!error) {
      navigate('/list-students');
    }
  }

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Aluno: {aluno.nome} </h1>
        </div>
        <div className="flex gap-6">
          <button
            onClick={() => handleEditStudent(aluno)}
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
              text={`${aluno.nome} ${aluno.matricula} - ${aluno.codTurma ? aluno.codTurma : 'Sem Turma'}`}
            />
          )}
        </div>
      </div>
      <hr className="mt-4" />

      <div className="bg-white shadow p-4 mt-4">
        <div>
          <dl className="divide-y divide-gray-100">
            <div className="px-4 pt-3 pb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Nome
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {aluno.nome}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Data de nascimento
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {aluno.dataNascimento}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Matricula
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {aluno.matricula}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {aluno.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Telefone
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {aluno.telefone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Endereço
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {aluno.endereco?.logradouro}, {aluno.endereco?.bairro}, {aluno.endereco?.numero} - {aluno.endereco?.municipio}/{aluno.endereco?.uf}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Turma
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {aluno.codTurma}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Layout>
  );
}
