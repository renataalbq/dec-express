import { IAluno } from '@/model/IAluno';
import { authorizedFetch } from '@/services/auth.interceptor';
import { useEffect, useState } from 'react';

function useGetStudentByMatricula(matricula: string) {
    const [student, setStudent] = useState<IAluno | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      setIsLoading(true);
  
      authorizedFetch(`http://localhost:8080/decexpress/aluno/${matricula}`, {
        method: 'GET',
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Requisição falhou');
          }
        })
        .then((data) => {
          setStudent(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError('Ocorreu um erro ao buscar o aluno');
          setIsLoading(false);
        });
    }, [matricula]);
  
    return { student, isLoading, error };
  }
  
  export default useGetStudentByMatricula;