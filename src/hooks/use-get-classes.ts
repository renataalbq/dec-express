import { useEffect, useState } from 'react';
import { ITurma } from '@/model/ITurma';

function useGetAllClasses() {
  const [classes, setClasses] = useState<ITurma[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    fetch('http://localhost:8080/decexpress/turma')
      .then((response) => response.json())
      .then((data) => {
        setClasses(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError('Erro ao buscar turmas: ' + error.message);
        setIsLoading(false);
      });
  }, []);

  return { classes, isLoading, error };
}

export default useGetAllClasses;