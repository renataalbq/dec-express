import { useCallback, useState } from 'react';

function useDeleteGrade(onSuccess: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteGrade = useCallback(async (idGrade: number) => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/grades/${idGrade}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar nota');
      }
      onSuccess();
      setIsLoading(false);
    } catch (error) {
      setError('Erro ao deletar nota');
      setIsLoading(false);
    }
  }, [onSuccess]);

  return { deleteGrade, isLoading, error };
}

export default useDeleteGrade;