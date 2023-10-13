import { CardStudent } from "@/components/card-student/card-student";
import { Layout } from "@/components/layout";
import { Pagination } from "@/components/pagination/pagination";
import ErrorPlaceholder from "@/components/placeholders/error";
import LoadingPlaceholder from "@/components/placeholders/loading";
import useGetAllStudents from "@/hooks/use-get-students";
import { useNavigate } from "react-router-dom";

export function ListStudents() {
  const navigate = useNavigate();
  const { students, isLoading, error } = useGetAllStudents();

  const handleCreateStudent = () => {
    navigate("/register-student");
  };

  const handleDetailStudent = (aluno: any) => {
    navigate(`/detail-students/${aluno.matricula}`, { state: { aluno } });
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
        {isLoading ? (
         <LoadingPlaceholder />
         ) : error ? (
           <ErrorPlaceholder error={error} />
         ) : (
          students?.map((aluno, index) => (
            <CardStudent
              key={index}
              aluno={aluno}
              handleDetailStudents={handleDetailStudent}
            />
          ))
        )}
        <Pagination current={1} total={3} onPageChange={() => {}} />
      </div>
    </Layout>
  );
}
