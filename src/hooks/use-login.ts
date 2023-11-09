import { useState } from 'react';

const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (loginData: any) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const authToken = responseData.token;

        localStorage.setItem('token', authToken);
        setError(null);
        setIsAuthenticated(true);
      } else {
        setError('Erro ao fazer login');
      }
    } catch (error) {
      setError('Erro ao fazer login');
    }
  };

  return { login, error, isAuthenticated };
};

export default useLogin;