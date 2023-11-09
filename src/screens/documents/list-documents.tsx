import { Layout } from "@/components/layout";
import { BiSearch } from "react-icons/bi";
export function ListDocuments() {
  return (
    <Layout>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Documentos</h1>
      </div>

      <div className="mt-6 space-y-4">
        <div className="bg-white shadow p-4 mt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Solicitações de declaração</h2>
            <div className="relative">
              <input
                type="text"
                className="bg-gray-200 text-gray-800 border rounded-md pl-4 pr-8 w-96 py-2"
                placeholder="Buscar aluno (nome, matrícula ou CPF)"
              />
              <span className="absolute top-1/2 right-2 transform -translate-y-1/2">
                <BiSearch />
              </span>
            </div>
          </div>

          <table className="w-full mt-6">
            <thead className="bg-black text-white">
              <tr>
                <th className="py-2 px-4">Nome</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Matrícula</th>
                <th className="py-2 px-4">Data da Emissão</th>
              </tr>
            </thead>
            <tbody className="bg-gray-500 text-white text-center">
              {Array.from({ length: 8 }).map((_, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">Nome do Aluno</td>
                  <td className="py-2 px-4">aluno@escola.com</td>
                  <td className="py-2 px-4">12345</td>
                  <td className="py-2 px-4">01/10/2023</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
