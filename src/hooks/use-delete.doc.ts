import { useState } from 'react';

function useDeleteDoc() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDoc = async (id: number) => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/documents/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar documento');
      }

      setIsLoading(false);
    } catch (error) {
      setError('Erro ao deletar documento');
      setIsLoading(false);
    }
  };

  return { deleteDoc, isLoading, error };
}

export default useDeleteDoc;