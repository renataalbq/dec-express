import { IAluno } from '@/model/IAluno';
import { useEffect, useState } from 'react';

function useGetStudentByEmail(email: string) {
    const [student, setStudent] = useState<IAluno | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      setIsLoading(true);
  
      fetch(`http://localhost:8080/decexpress/aluno/email/${email}`, {
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
          console.log(err)
        });
    }, [email]);
  
    return { student, isLoading, error };
  }
  
  export default useGetStudentByEmail;