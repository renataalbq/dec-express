import { useCallback } from 'react';
import { useState } from 'react';

function useDeleteDoc(onSuccess: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDoc = useCallback(async (docId: number) => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/documents/${docId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar documento');
      }

      onSuccess();
      setIsLoading(false);
    } catch (error) {
      setError('Erro ao deletar documento');
      setIsLoading(false);
    }
  }, [onSuccess]);

  return { deleteDoc, isLoading, error };
}

export default useDeleteDoc;