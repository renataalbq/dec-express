import { useEffect, useState } from 'react';

interface ISubject {
    name: string;
}

function useGetAllSubjects() {
  const [subjects, setSubjects] = useState<ISubject[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    fetch('http://localhost:3000/subjects', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Ocorreu um erro ao buscar disciplinas');
        setIsLoading(false);
      });
  }, []);

  return { subjects, isLoading, error };
}

export default useGetAllSubjects;