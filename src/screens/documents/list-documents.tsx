import { DocumentsTable } from "@/components/documents-table/documents-table";
import { Layout } from "@/components/layout";
import { NavigationMenu } from "@/components/navigation-menu/navigation-menu";
import ErrorPlaceholder from "@/components/placeholders/error";
import useDeleteDoc from "@/hooks/documents/use-delete.doc";
import useGetDocumentsList from "@/hooks/documents/use-get-documents";
import { useServerAvailable } from "@/hooks/use-server-available";
import { SetStateAction, useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 5;
 
export function ListDocuments() {
  const [sortDecField, setSortDecField] = useState("");
  const [sortDecOrder, setSortDecOrder] = useState("asc");
  const [sortHistField, setSortHistField] = useState("");
  const [sortHistOrder, setSortHistOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("declaracao");
  const { documents, refetch } = useGetDocumentsList();
  const serverOn = useServerAvailable("http://localhost:3000/documents");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentView]);

  const { deleteDoc } = useDeleteDoc(() => {
    refetch();
  });

  const handleDelete = (docId: number) => {
    deleteDoc(docId);
  };

  const filteredDocuments = useMemo(() => {
    if (!documents) return [];

    return documents.filter(
      (doc) =>
        doc.tipo === currentView &&
        (doc.nome_aluno?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.matricula?.toString().includes(searchQuery))
    );
  }, [documents, currentView, searchQuery]);

  const handleSortChange = (field: any) => {
    if (currentView == "declaracao") {
      setSortDecOrder(
        sortDecField === field && sortDecOrder === "asc" ? "desc" : "asc"
      );
      setSortDecField(field);
    } else {
      setSortHistOrder(
        sortHistField === field && sortHistOrder === "asc" ? "desc" : "asc"
      );
      setSortHistField(field);
    }
  };

  const handleMenuSelect = (view: SetStateAction<string>) => {
    setCurrentView(view);
  };

  const sortedDocuments = useMemo(() => {
    if (!filteredDocuments) return [];

    const filteredDocs = filteredDocuments.filter(
      (doc) => doc.tipo === currentView
    );

    const sortField =
      currentView === "declaracao" ? sortDecField : sortHistField;
    const sortOrder =
      currentView === "declaracao" ? sortDecOrder : sortHistOrder;

    return filteredDocs.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [
    filteredDocuments,
    documents,
    sortDecField,
    sortDecOrder,
    sortHistField,
    sortHistOrder,
    currentView,
  ]);

  const paginatedDocuments = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedDocuments.slice(startIndex, endIndex);
  }, [currentPage, sortedDocuments]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedDocuments.length / ITEMS_PER_PAGE);
  }, [sortedDocuments]);

  const handlePageChange = (newPage: SetStateAction<number>) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Layout>
      {!serverOn ? (
        <ErrorPlaceholder error={"Servidor indisponível"} />
      ) : (
        <>
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Documentos</h1>
          </div>
          <NavigationMenu
            onMenuSelect={handleMenuSelect}
            currentView={currentView}
          />
          <div className="space-y-2">
            <DocumentsTable
              sortedDocuments={paginatedDocuments}
              handleSortChange={handleSortChange}
              handleSearchChange={handleSearchChange}
              searchQuery={searchQuery}
              page={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              titleTable={`Solicitações de ${
                currentView === "declaracao" ? `declaração` : `histórico`
              }`}
              onDeleteDoc={handleDelete}
            />
          </div>
        </>
      )}
    </Layout>
  );
}
