import { IUsuario } from '@/model/IUsuario';
import { useEffect, useState } from 'react';

function useGetAllStudents() {
  const [users, setUsers] = useState<IUsuario[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    fetch('http://localhost:3000/users', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Ocorreu um erro ao buscar usuarios');
        setIsLoading(false);
      });
  }, []);

  return { users, isLoading, error };
}

export default useGetAllStudents;