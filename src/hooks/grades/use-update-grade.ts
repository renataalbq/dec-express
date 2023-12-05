import { INotas } from '@/model/INotas';
import { useState } from 'react';

function useUpdateGrade() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateGrade = async (idGrade: number, gradeData: INotas) => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/grades/${idGrade}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gradeData),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar nota');
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error)
      setError('Erro ao atualizar nota');
      setIsLoading(false);
    }
  };

  return { updateGrade, isLoading, error };
}

export default useUpdateGrade;