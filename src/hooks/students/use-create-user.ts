import { IUsuario } from '@/model/IUsuario';
import { useState } from 'react';

function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (userData: IUsuario) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(response.type);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error)
      setError('Erro ao criar aluno');
      setIsLoading(false);
    }
  };

  return { createUser, isLoading, error };
}

export default useCreateUser;