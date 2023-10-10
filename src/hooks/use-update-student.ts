import { IAluno } from '@/model/IAluno';
import { useState } from 'react';

function useUpdateStudent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStudent = async (cod_aluno: number, studentData: IAluno) => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/decexpress/aluno/${cod_aluno}`, {
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