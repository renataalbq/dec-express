import { IAluno } from '@/model/IAluno';
import { useEffect, useState } from 'react';

function useGetAllStudents() {
  const [students, setStudents] = useState<IAluno[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    fetch('http://localhost:8080/decexpress/aluno')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError('Erro ao buscar alunos: ' + error.message);
        setIsLoading(false);
      });
  }, []);

  return { students, isLoading, error };
}

export default useGetAllStudents;