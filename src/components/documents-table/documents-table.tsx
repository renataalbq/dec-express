import { date_format } from "@/utils/date-formatter";
import { BiSearch } from "react-icons/bi";
import { Pagination } from "../pagination/pagination";
import { SetStateAction } from "react";
import { IDocuments } from "@/model/IDocuments";

interface DocuementsTableProps {
  searchQuery: string;
  handleSearchChange: (event: {target: {value: SetStateAction<string>;};}) => void;
  handleSortChange: (field: string) => void;
  sortedDocuments: IDocuments[];
  page: number;
  totalPages: number;
  handlePageChange: (newPage: SetStateAction<number>) => void;
  titleTable: string;
}
export const DocumentsTable = (props: DocuementsTableProps) => {
  return (
    <div className="bg-white shadow p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{props.titleTable}</h2>
        <div className="relative">
          <input
            type="text"
            className="bg-gray-200 text-gray-800 border rounded-md pl-4 pr-8 w-96 py-2"
            placeholder="Buscar documento (nome do aluno ou matrícula)"
            value={props.searchQuery}
            onChange={props.handleSearchChange}
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
            <th
              className="py-2 px-4 cursor-pointer"
              onClick={() => props.handleSortChange("data_solicitacao")}
            >
              Data da Solicitação
            </th>
            <th
              className="py-2 px-4 cursor-pointer"
              onClick={() => props.handleSortChange("data_validade")}
            >
              Data de Validade
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-500 text-white text-center">
          {props.sortedDocuments?.map((document: any, index: number) => (
            <tr key={index}>
              <td className="py-2 px-4">{document.nome_aluno}</td>
              <td className="py-2 px-4">{document.matricula}</td>
              <td className="py-2 px-4">
                {date_format(document.data_solicitacao)}
              </td>
              <td className="py-2 px-4">
                {date_format(document.data_validade)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        current={props.page}
        total={props.totalPages}
        onPageChange={props.handlePageChange}
      />
    </div>
  );
};
