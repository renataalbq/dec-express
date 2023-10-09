import { CardClass } from "@/components/card-class/card-class";
import { Layout } from "@/components/layout";
import { Pagination } from "@/components/pagination/pagination";
import useGetAllClasses from "@/hooks/use-get-classes";
import { ITurma } from "@/model/ITurma";
import { Key } from "react";
import { useNavigate } from "react-router-dom";


export function ListClass() {
  const navigate = useNavigate();
  const { classes, isLoading, error } = useGetAllClasses();

  const handleCreateClass = () => {
    navigate("/register-class");
  };

  const handleInfoClass = (turma: any) => {
    navigate(`/info-class/${turma.id}`, { state: { turma } });
  };

  return (
    <Layout>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Turmas</h1>
        <button
          onClick={handleCreateClass}
          className="hidden sm:block bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded hover:from-blue-800 hover:to-blue-500"
        >
          Cadastrar nova turma
        </button>
        <button
          onClick={handleCreateClass}
          className="sm:hidden bg-gradient-to-r from-blue-500 to-blue-800 text-white font-semibold px-3 py-1 rounded"
        >
          +
        </button>
      </div>

      <div className="mt-6 space-y-4">
      {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          classes?.map((turma: ITurma, index: Key | null | undefined) => (
            <CardClass
              key={index}
              turma={turma}
              handleInfoClass={handleInfoClass}
            />
          ))
        )}
        <Pagination current={1} total={3} />
      </div>
    </Layout>
  );
}
