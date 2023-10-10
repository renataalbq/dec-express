import { IAluno } from '@/model/IAluno';
import { useState } from 'react';

function useCreateStudent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const createStudent = async (studentData: IAluno) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/decexpress/aluno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar aluno');
      }

      setIsLoading(false);
    } catch (error) {
      setError('Erro ao criar aluno');
      setIsLoading(false);
    }
  };

  return { createStudent, isLoading, error };
}

export default useCreateStudent;