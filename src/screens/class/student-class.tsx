import { Layout } from "@/components/layout";
import ErrorPlaceholder from "@/components/placeholders/error";
import LoadingPlaceholder from "@/components/placeholders/loading";
import NoClassPlaceholder from "@/components/placeholders/no-class";
import useGetStudentByEmail from "@/hooks/students/use-find-by-email";
import useGetStudentByMatricula from "@/hooks/students/use-get-student-by-mat";
import { useServerAvailable } from "@/hooks/use-server-available";
import { useAuth } from "@/store/auth.context";
import { toCapitalize } from "@/utils/capitalize-formatter";
import { nivel_format } from "@/utils/nivel-formatter";

const horarios = [
  {horario: "07:00 - 07:50", seg: "Álgebra", ter: "Português", qua: "Biologia", qui: "História", sex: "Química"},
  {horario: "07:50 - 08:40", seg: "Álgebra", ter: "Português", qua: "Biologia", qui: "História", sex: "Química"},
  {horario: "08:40 - 09:30", seg: "História", ter: "Inglês", qua: "Português", qui: "Biologia", sex: "Geografia"},
  {horario: "10:00 - 10:50", seg: "História", ter: "Inglês", qua: "Português", qui: "Biologia", sex: "Geografia"},
  {horario: "10:50 - 11:40", seg: "Geografia", ter: "Álgebra", qua: "Química", qui: "Física", sex: "Física"},
  {horario: "11:40 - 12:30", seg: "Geografia", ter: "Álgebra", qua: "Química", qui: "Física", sex: "Física"},
]

export function StudentClass() {
  const { email } = useAuth();
  const { student: studentEmail, isLoading: loadingEmail } = useGetStudentByEmail(email);
  const { student, isLoading } = useGetStudentByMatricula(studentEmail?.matricula || '');
  const serverOn = useServerAvailable("http://localhost:8080/decexpress/aluno");

  return (
    <Layout>
      {!serverOn ? (
          <ErrorPlaceholder error={"Servidor indisponível"} />
        ) : isLoading || loadingEmail ? (
          <LoadingPlaceholder />
        ) :  student?.turma ?
        <>
          <div className="flex justify-between">
            <div>
            <h1 className="text-2xl font-semibold">Turma: {student?.turma?.serie}º Ano {toCapitalize(student?.turma?.turma || '')} - {nivel_format(student?.turma?.nivel || '')}</h1>
            <p className="text-sm text-neutral-500">Informações da turma: {student?.turma?.serie}º Ano {toCapitalize(student?.turma?.turma || '')} - {nivel_format(student?.turma?.nivel || '')} ({student?.turma?.ano})</p>
            </div>
          </div>
          <hr className="mt-4" />

          <div className="bg-white shadow p-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Horários</h2>
            </div>

            <table className="w-full mt-6">
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-2 px-4">Horário</th>
                  <th className="py-2 px-4">Segunda</th>
                  <th className="py-2 px-4">Terça</th>
                  <th className="py-2 px-4">Quarta</th>
                  <th className="py-2 px-4">Quinta</th>
                  <th className="py-2 px-4">Sexta</th>
                </tr>
              </thead>
              <tbody className="bg-gray-500 text-white text-center">
                {horarios.map((hor, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">{hor.horario}</td>
                    <td className="py-2 px-4">{hor.seg}</td>
                    <td className="py-2 px-4">{hor.ter}</td>
                    <td className="py-2 px-4">{hor.qua}</td>
                    <td className="py-2 px-4">{hor.qui}</td>
                    <td className="py-2 px-4">{hor.sex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </> :
        <NoClassPlaceholder />
    }
    </Layout>
  );
}