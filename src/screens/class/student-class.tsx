import { useLocation } from "react-router-dom";
import { Pagination } from "@/components/pagination/pagination";
import { Layout } from "@/components/layout";
import { nivel_format } from "@/utils/nivel-formatter";

export function StudentClass() {
    const location = useLocation();
    const { turma } = location.state;

  return (
    <Layout>
          <div className="flex justify-between">
            <div>
            <h1 className="text-2xl font-semibold">Turma: {turma.serie}º Ano {turma.turma} - {nivel_format(turma.nivel)}</h1>
            <p className="text-sm text-neutral-500">Informações da turma: {turma.serie}º Ano {turma.turma} - {nivel_format(turma.nivel)} ({turma.ano})</p>
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
                  <th className="py-2 px-4">Segunda</th>
                  <th className="py-2 px-4">Terça</th>
                  <th className="py-2 px-4">Quarta</th>
                  <th className="py-2 px-4">Quinta</th>
                  <th className="py-2 px-4">Sexta</th>
                </tr>
              </thead>
              <tbody className="bg-gray-500 text-white text-center">
                {Array.from({ length: 8 }).map((_, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">Matemática  </td>
                    <td className="py-2 px-4">Português</td>
                    <td className="py-2 px-4">Inglês</td>
                    <td className="py-2 px-4">História</td>
                    <td className="py-2 px-4">Geografia</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination current={1} total={5} onPageChange={() => {}} />
          </div>
    </Layout>
  );
}