import { IAluno } from '@/model/IAluno';
import { authorizedFetch } from '@/services/auth.interceptor';
import { useEffect, useState } from 'react';

function useGetAllStudents() {
  const [students, setStudents] = useState<IAluno[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    authorizedFetch('http://localhost:8080/decexpress/aluno', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Ocorreu um erro ao buscar alunos');
        setIsLoading(false);
      });
  }, []);

  return { students, isLoading, error };
}

export default useGetAllStudents;