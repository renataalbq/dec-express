import { useEffect, useState, useCallback } from 'react';
import { INotas } from '@/model/INotas';

function useGetGrades(email: string) {
  const [grades, setGrades] = useState<INotas[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGrades = useCallback(() => {
    setIsLoading(true);

    fetch(`http://localhost:3000/grades/find_by_email?email=${email}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setGrades(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Ocorreu um erro ao buscar notas: ' + err.message);
        setIsLoading(false);
      });
  }, [email]);

  useEffect(() => {
    fetchGrades();
  }, [fetchGrades]);

  return { grades, isLoading, error, refetch: fetchGrades };
}

export default useGetGrades;
