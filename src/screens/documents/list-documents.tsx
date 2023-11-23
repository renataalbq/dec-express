import { Layout } from "@/components/layout";
import { Pagination } from "@/components/pagination/pagination";
import useGetDocumentsList from "@/hooks/use-get-documents";
import { date_format } from "@/utils/date-formatter";
import { SetStateAction, useState } from "react";
import { BiSearch } from "react-icons/bi";
export function ListDocuments() {
  const [page, setPage] = useState(1);
  const { documents, totalPages } = useGetDocumentsList(page);

  const handlePageChange = (newPage: SetStateAction<number>) => {
    setPage(newPage);
  };
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
                <th className="py-2 px-4">Matrícula</th>
                <th className="py-2 px-4">Data da Emissão</th>
                <th className="py-2 px-4">Data de Validade</th>
              </tr>
            </thead>
            <tbody className="bg-gray-500 text-white text-center">
              {documents?.map((document, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{document.nome_aluno}</td>
                  <td className="py-2 px-4">{document.matricula}</td>
                  <td className="py-2 px-4">{document.data_solicitacao}</td>
                  <td className="py-2 px-4">{date_format(document.data_validade)}</td>

                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            current={page} 
            total={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
}
