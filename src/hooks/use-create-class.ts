import { ITurmaDTO } from '@/model/ITurma';
import { useState } from 'react';

function useCreateClass() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const createClass = async (classData: ITurmaDTO) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/decexpress/turma', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
      });

      if (!response.ok) {
        throw new Error('Failed to create class');
      }

      setIsLoading(false);
    } catch (error) {
      setError('Error ao criar turma');
      setIsLoading(false);
    }
  };

  return { createClass, isLoading, error };
}

export default useCreateClass;