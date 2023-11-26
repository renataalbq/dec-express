import { DocumentsTable } from "@/components/documents-table/documents-table";
import { Layout } from "@/components/layout";
import { NavigationMenu } from "@/components/navigation-menu/navigation-menu";
import useDeleteDoc from "@/hooks/use-delete.doc";
import useGetDocumentsList from "@/hooks/use-get-documents";
import { SetStateAction, useEffect, useMemo, useState } from "react";

export function ListDocuments() {
  const [page, setPage] = useState(1);
  const [sortDecField, setSortDecField] = useState("");
  const [sortDecOrder, setSortDecOrder] = useState("asc");
  const [sortHistField, setSortHistField] = useState("");
  const [sortHistOrder, setSortHistOrder] = useState("asc"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState('declaracao');
  const {deleteDoc} = useDeleteDoc()

  useEffect(() => {
    setPage(1);
  }, [currentView]);

  const { documents, totalPages } = useGetDocumentsList(page);

  const handlePageChange = (newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleSortChange = (field: any) => {
    if (currentView == 'declaracao'){
      setSortDecOrder(sortDecField === field && sortDecOrder === "asc" ? "desc" : "asc");
      setSortDecField(field);
    } else {
      setSortHistOrder(sortHistField === field && sortHistOrder === "asc" ? "desc" : "asc");
      setSortHistField(field);
    }
    
  };

  const handleMenuSelect = (view: SetStateAction<string>) => {
    setCurrentView(view);
  };

  const sortedDocuments = useMemo(() => {
    if (!documents) return [];
    
    const filteredDocs = documents.filter(doc => doc.tipo === currentView);

    const sortField = currentView === 'declaracao' ? sortDecField : sortHistField;
    const sortOrder = currentView === 'declaracao' ? sortDecOrder : sortHistOrder;

    return filteredDocs.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [documents, sortDecField, sortDecOrder, sortHistField, sortHistOrder, currentView]);



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
          <DocumentsTable 
            sortedDocuments={sortedDocuments}
            handleSortChange={handleSortChange}
            handleSearchChange={handleSearchChange}
            searchQuery={searchQuery}
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            titleTable={`Solicitações de ${currentView === 'declaracao' ? `declaração` : `histórico`}`}
            onDeleteDoc={() => deleteDoc(0)}
          />
        
      </div>
    </Layout>
  );
}
