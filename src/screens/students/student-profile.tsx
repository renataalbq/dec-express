import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import useGetStudentByMatricula from "@/hooks/use-get-student-by-mat";
import useGetStudentByEmail from "@/hooks/use-find-by-email";
import { useAuth } from "@/store/auth.context";

export function StudentProfile() {
  const navigate = useNavigate();
  const { email } = useAuth();
  const { student: studentEmail } = useGetStudentByEmail(email);
  const { student } = useGetStudentByMatricula(studentEmail?.matricula || '');

  const handleEditStudent = (student: any) => {
    navigate(`/edit-profile/${student.matricula}`, {state: { student }});
  };

 return (
  student &&
    <Layout>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Aluno: {student.nome} </h1>
        </div>
        <div className="flex gap-6">
          <button
            onClick={() => handleEditStudent(student)}
            className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 rounded hover:from-blue-800 hover:to-blue-500"
          >
            Editar Perfil
          </button>
          
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
                {student.nome}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Data de nascimento
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.dataNascimento}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Matricula
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.matricula}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Telefone
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.telefone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Endereço
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.endereco?.logradouro}, {student.endereco?.bairro}, {student.endereco?.numero} - {student.endereco?.municipio}/{student.endereco?.uf}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Turma
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {student.turma?.serie}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Layout>
  );
}
