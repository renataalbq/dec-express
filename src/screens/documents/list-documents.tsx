import { DocumentsTable } from "@/components/documents-table/documents-table";
import { Layout } from "@/components/layout";
import { NavigationMenu } from "@/components/navigation-menu/navigation-menu";
import useGetDocumentsList from "@/hooks/use-get-documents";
import { SetStateAction, useMemo, useState } from "react";

export function ListDocuments() {
  const [page, setPage] = useState(1);
  const { documents, totalPages } = useGetDocumentsList(page);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState('declaracao');

  const handlePageChange = (newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleSortChange = (field: any) => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  const handleMenuSelect = (view: SetStateAction<string>) => {
    setCurrentView(view);
  };

  const sortedDocuments = useMemo(() => {
    if (!documents) return [];
    
    const sortedDocs = [...documents];
    sortedDocs.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sortedDocs;
  }, [documents, sortField, sortOrder]);

  const handleSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Layout>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Documentos</h1>
      </div>
      <NavigationMenu onMenuSelect={handleMenuSelect} currentView={currentView} />
      <div className="space-y-2">
      {currentView === 'declaracao' ? (
          <DocumentsTable 
            sortedDocuments={sortedDocuments}
            handleSortChange={handleSortChange}
            handleSearchChange={handleSearchChange}
            searchQuery={searchQuery}
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            titleTable={"Solicitações de declaração"}
          />
        ) : (
          <DocumentsTable 
            sortedDocuments={[]}
            handleSortChange={handleSortChange}
            handleSearchChange={handleSearchChange}
            searchQuery={''}
            page={0}
            totalPages={0}
            handlePageChange={handlePageChange}
            titleTable={"Solicitações de histórico"}
          />
        )}
      </div>
    </Layout>
  );
}
