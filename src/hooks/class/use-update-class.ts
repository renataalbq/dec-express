import { ITurmaDTO } from '@/model/ITurma';
import { authorizedFetch } from '@/services/auth.interceptor';
import { useState } from 'react';

function useUpdateClass() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateClass = async (codTurma: number, classData: ITurmaDTO) => {
    setIsLoading(true);

    try {
      const response = await authorizedFetch(`http://localhost:8080/decexpress/turma/${codTurma}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar turma');
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error)
      setError('Erro ao atualizar turma');
      setIsLoading(false);
    }
  };

  return { updateClass, isLoading, error };
}

export default useUpdateClass;