import { INotas } from '@/model/INotas';
import { useState } from 'react';

function useCreateGrade() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const createGrade = async (gradeData: INotas) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/grades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gradeData),
      });

      if (!response.ok) {
        throw new Error('Failed to create grade');
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error)
      setError('Error ao registrar nota');
      setIsLoading(false);
    }
  };

  return { createGrade, isLoading, error };
}

export default useCreateGrade;