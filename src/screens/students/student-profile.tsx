import { Layout } from "@/components/layout";
import useGetStudentByMatricula from "@/hooks/students/use-get-student-by-mat";
import useGetStudentByEmail from "@/hooks/students/use-find-by-email";
import { useAuth } from "@/store/auth.context";
import LoadingFieldsPlaceholder from "@/components/placeholders/loading-field";
import { useServerAvailable } from "@/hooks/use-server-available";
import ErrorPlaceholder from "@/components/placeholders/error";
import { nivel_format } from "@/utils/nivel-formatter";
import { useState } from "react";
import { ModalUpdatePassword } from "@/components/modals/modal-update-password";

export function StudentProfile() {
  const { email } = useAuth();
  const { student: studentEmail } = useGetStudentByEmail(email);
  const { student } = useGetStudentByMatricula(studentEmail?.matricula || "");
  const serverOn = useServerAvailable("http://localhost:8080/decexpress/aluno");
  const [modalOpen, setModalOpen] = useState<Boolean>()

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  
  const handleCancelDelete = () => {
    setModalOpen(false);
  };

  return (
    <Layout>
      {serverOn ? (
        <>
          <div className="flex justify-between">
            <div>
              <h1 className="flex text-2xl font-semibold">
                Aluno: {student ? student.nome : <LoadingFieldsPlaceholder />}
              </h1>
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
                    {student ? student.nome : <LoadingFieldsPlaceholder />}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Data de nascimento
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {student ? (
                      student.dataNascimento
                    ) : (
                      <LoadingFieldsPlaceholder />
                    )}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Matricula
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {student ? student.matricula : <LoadingFieldsPlaceholder />}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {student ? student.email : <LoadingFieldsPlaceholder />}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Telefone
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {student ? student?.telefone : <LoadingFieldsPlaceholder />}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Endereço
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {student?.endereco
                      ? `${student?.endereco?.logradouro}, ${student?.endereco?.bairro}, ${student?.endereco?.numero} - ${student?.endereco?.municipio}/${student?.endereco?.uf}`
                      : "Aluno sem endereço cadastrado"}
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
                onClick={() => handleOpenModal()}
                className="bg-gradient-to-r w-70  from-blue-500 to-blue-700 text-white px-4 py-2 rounded hover:from-blue-800 hover:to-blue-500"
              >Alterar senha
              </button>
            </div>
            {modalOpen && (
              <ModalUpdatePassword
              onCancel={handleCancelDelete}
              emailUser={student ? student?.email : ''}
            />
            )}
          </div>
        </>
      ) : (
        <ErrorPlaceholder error={"Servidor indisponível"} />
      )}
    </Layout>
  );
}
