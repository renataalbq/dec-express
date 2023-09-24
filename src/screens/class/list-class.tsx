import { Sidebar } from "@/components/sidebar";
import { useNavigate } from "react-router-dom";

const turmas = [{ano: '1º ano - Ensino Fundamental I'}, {ano: '2º ano - Ensino Fundamental I'}, 
{ano: '3º ano - Ensino Fundamental I'}, {ano: '4º ano - Ensino Fundamental I'}, 
{ano: '5º ano - Ensino Fundamental I'}, {ano: '6º ano - Ensino Fundamental II'}]

export function ListClass() {
    const navigate = useNavigate();

    const handleCreateClass = () => {
		navigate('/register-class');
	};

  return (
    <main className="flex-1 flex gap-6">
      <Sidebar />
   
      <div className="ml-4 p-8">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Turmas</h1>
          <button onClick={handleCreateClass} className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded hover:from-blue-800 hover:to-blue-500">
            Cadastrar nova turma
          </button>
        </div>

        <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {turmas.map((turma, index) => (
            <div key={index} className="bg-white rounded shadow-md p-6">
              <p className="text-lg font-semibold">{turma.ano}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}