import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { IPayload } from '@/model/IPayload';

interface AuthContextType {
  token: string | null;
  isAdmin: boolean;
  name: string;
  email: string;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType); // Removido o null para simplificar a verificação

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const initializeAuthState = (): AuthContextType => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded: IPayload = jwtDecode(token);
      return {
        token,
        isAdmin: decoded.isAdmin,
        name: decoded.name,
        email: decoded.email,
        login: () => {},
        logout: () => {},
      };

    } catch (error) {
      localStorage.removeItem('token');
    }
  }
  return {
    token: null,
    isAdmin: false,
    name: '',
    email: '',
    login: () => {},
    logout: () => {},
  };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthContextType>(initializeAuthState());

  useEffect(() => {
    setAuthState((prevState) => ({
      ...prevState,
      login: (newToken: string) => {
        const decoded: IPayload = jwtDecode(newToken);
        localStorage.setItem('token', newToken);
        setAuthState({
          ...prevState,
          token: newToken,
          isAdmin: decoded.isAdmin,
          name: decoded.name,
          email: decoded.email,
        });
      },
      logout: () => {
        localStorage.removeItem('token');
        setAuthState({
          ...prevState,
          token: null,
          isAdmin: false,
          name: '',
          email: '',
        });
      },
    }));
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};
