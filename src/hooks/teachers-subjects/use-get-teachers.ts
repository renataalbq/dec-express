import { useEffect, useState } from 'react';

interface ITeacher {
    name: string;
}

function useGetAllTeachers() {
  const [teachers, setTeachers] = useState<ITeacher[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    fetch('http://localhost:3000/teachers', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setTeachers(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Ocorreu um erro ao buscar professores');
        setIsLoading(false);
      });
  }, []);

  return { teachers, isLoading, error };
}

export default useGetAllTeachers;