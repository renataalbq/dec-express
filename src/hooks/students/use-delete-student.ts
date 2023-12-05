import { authorizedFetch } from '@/services/auth.interceptor';
import { useState } from 'react';

function useDeleteStudents() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteStudents = async (matricula: string) => {
    setIsLoading(true);

    try {
      const response = await authorizedFetch(`http://localhost:8080/decexpress/aluno/${matricula}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar aluno');
      }

      setIsLoading(false);
    } catch (error) {
      setError('Erro ao deletar aluno');
      setIsLoading(false);
    }
  };

  return { deleteStudents, isLoading, error };
}

export default useDeleteStudents;