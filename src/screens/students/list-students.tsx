import { CardStudent } from "@/components/card-student/card-student";
import { Layout } from "@/components/layout";
import { Pagination } from "@/components/pagination/pagination";
import ErrorPlaceholder from "@/components/placeholders/error";
import LoadingPlaceholder from "@/components/placeholders/loading";
import useGetAllStudents from "@/hooks/students/use-get-students";
import { IAluno } from "@/model/IAluno";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ListStudents() {
  const navigate = useNavigate();
  const { students, isLoading, error } = useGetAllStudents();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedStudents, setDisplayedStudents] = useState<IAluno[]>([]);

  const handleCreateStudent = () => {
    navigate("/register-student");
  };

  const handleDetailStudent = (aluno: any) => {
    navigate(`/detail-students/${aluno.matricula}`, { state: { aluno } });
  };

  useEffect(() => {
    if (!isLoading && !error && students) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const studentsToDisplay = students.slice(startIndex, endIndex);

      setDisplayedStudents(studentsToDisplay);
    }
  }, [students, currentPage, isLoading, error]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          displayedStudents?.map((aluno, index) => (
            <CardStudent
              key={index}
              aluno={aluno}
              handleDetailStudents={handleDetailStudent}
            />
          ))
        )}

        <Pagination current={currentPage} total={Math.ceil(students ? students.length / itemsPerPage : 3)} onPageChange={handlePageChange} />
      </div>
    </Layout>
  );
}
