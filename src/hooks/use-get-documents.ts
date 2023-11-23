import { useEffect, useState } from 'react';
import { IDocuments } from '@/model/IDocuments';

function useGetDocumentsList(page: number) {
  const [documents, setDocuments] = useState<IDocuments[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    fetch(`http://localhost:3000/documents?page=${page}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data.documents);
        setTotalPages(data.total_pages);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Ocorreu um erro ao buscar documentos');
        setIsLoading(false);
      });
  }, [page]);

  return { documents, isLoading, error, totalPages };
}

export default useGetDocumentsList;