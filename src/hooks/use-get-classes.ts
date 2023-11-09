import { useEffect, useState } from 'react';
import { ITurma } from '@/model/ITurma';
import { authorizedFetch } from '@/services/auth.interceptor';

function useGetAllClasses() {
  const [classes, setClasses] = useState<ITurma[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    authorizedFetch('http://localhost:8080/decexpress/turma', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setClasses(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Ocorreu um erro ao buscar turmas');
        setIsLoading(false);
      });
  }, []);

  return { classes, isLoading, error };
}

export default useGetAllClasses;