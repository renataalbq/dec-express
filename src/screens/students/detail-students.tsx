import { useLocation, useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { ConfirmationModal } from "@/components/modal-confirmation/modal-confirmation";
import { Layout } from "@/components/layout";
import useDeleteStudents from "@/hooks/students/use-delete-student";
import { nivel_format } from "@/utils/nivel-formatter";
import useGetStudentByMatricula from "@/hooks/students/use-get-student-by-mat";

export function DetailStudents() {
  const navigate = useNavigate();
  const location = useLocation();
  const { aluno } = location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteStudents, error } = useDeleteStudents();
  const { student } = useGetStudentByMatricula(aluno.matricula);

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

  const handleRegisterGrades = (aluno: any) => {
    navigate(`/register-grade/${aluno.matricula}`, {state: { aluno }});

  }

  return (
    <Layout>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Aluno: {student?.nome} </h1>
        </div>
        <div className="flex gap-6">
          <button
            onClick={() => handleEditStudent(student)}
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
              text={`${student?.nome} ${student?.matricula} - ${student?.turma ? student?.turma.serie : 'Sem Turma'}`}
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
                {student?.nome}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Data de nascimento
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student?.dataNascimento}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Matricula
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student?.matricula}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student?.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Telefone
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student?.telefone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Endereço
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student?.endereco ? 
                (`${student?.endereco?.logradouro}, ${student?.endereco?.bairro}, ${student?.endereco?.numero} - ${student?.endereco?.municipio}/${student?.endereco?.uf}`) : 'Aluno sem endereço cadastrado'}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Turma
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student?.turma ?
                (`${student?.turma.serie}º Ano ${student?.turma.turma} - ${nivel_format(student?.turma.nivel)}`) : 'Aluno sem vínculo com turma'} 
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-6">
        <button
          onClick={() => handleRegisterGrades(student)}
          className="bg-gradient-to-r w-70  from-blue-500 to-blue-700 text-white px-4 py-2 rounded hover:from-blue-800 hover:to-blue-500"
        >Registrar notas do aluno</button>
        </div>
      </div>
    </Layout>
  );
}
