import { Layout } from "@/components/layout";
import useGetStudentByMatricula from "@/hooks/students/use-get-student-by-mat";
import useGetStudentByEmail from "@/hooks/students/use-find-by-email";
import { useAuth } from "@/store/auth.context";
import LoadingFieldsPlaceholder from "@/components/placeholders/loading-field";
import { useServerAvailable } from "@/hooks/use-server-available";
import ErrorPlaceholder from "@/components/placeholders/error";

export function StudentProfile() {
  const { email } = useAuth();
  const { student: studentEmail } = useGetStudentByEmail(email);
  const { student } = useGetStudentByMatricula(studentEmail?.matricula || "");
  const serverOn = useServerAvailable("http://localhost:8080/decexpress/aluno");

  return (
    <Layout>
      {!serverOn ? (
        <ErrorPlaceholder error={"Servidor indisponível"} />
      ) : (
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
                      ? `${student?.endereco?.logradouro}, ${student?.endereco?.bairro},
                ${student?.endereco?.numero} - ${student?.endereco?.municipio}/
                ${student?.endereco?.uf}`
                      : "-"}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Turma
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {student?.turma?.serie
                      ? student?.turma?.serie
                      : "Aluno sem vínculo com turma"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
