import { useEffect, useState, useCallback } from 'react';
import { IDocuments } from '@/model/IDocuments';

function useGetDocumentsList() {
  const [documents, setDocuments] = useState<IDocuments[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(() => {
    setIsLoading(true);
    setError(null);

    fetch(`http://localhost:3000/documents`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data);
        setIsLoading(false);
      })
    .catch(() => {
        setError('Ocorreu um erro ao buscar documentos');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return { documents, isLoading, error, refetch: fetchDocuments };
}

export default useGetDocumentsList;
