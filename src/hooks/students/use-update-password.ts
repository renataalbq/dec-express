import { useState } from 'react';

function useUpdatePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePassword = async (email: string, newPassword: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/update_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: newPassword }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar senha');
      }

      setIsLoading(false);
    } catch (error) {
      setError('Erro ao atualizar senha');
      setIsLoading(false);
    }
  };

  return { updatePassword, isLoading, error };
}


export default useUpdatePassword;