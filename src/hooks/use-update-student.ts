import { IAluno } from '@/model/IAluno';
import { authorizedFetch } from '@/services/auth.interceptor';
import { useState } from 'react';

function useUpdateStudent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStudent = async (matricula: number, studentData: IAluno) => {
    setIsLoading(true);

    try {
      const response = await authorizedFetch(`http://localhost:8080/decexpress/aluno/${matricula}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar aluno');
      }

      setIsLoading(false);
    } catch (error) {
      setError('Erro ao atualizar aluno');
      setIsLoading(false);
    }
  };

  return { updateStudent, isLoading, error };
}

export default useUpdateStudent;