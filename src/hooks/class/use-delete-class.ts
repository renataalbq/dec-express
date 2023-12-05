import { authorizedFetch } from '@/services/auth.interceptor';
import { useState } from 'react';

function useDeleteClass() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteClass = async (codTurma: number) => {
    setIsLoading(true);

    try {
      const response = await authorizedFetch(`http://localhost:8080/decexpress/turma/${codTurma}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar turma');
      }

      setIsLoading(false);
    } catch (error) {
      setError('Erro ao deletar turma');
      setIsLoading(false);
    }
  };

  return { deleteClass, isLoading, error };
}

export default useDeleteClass;