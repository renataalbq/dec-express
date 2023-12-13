import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

interface IPayload {
  isAdmin: boolean;
  name: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  isAdmin: boolean;
  name: string;
  email: string;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!); // Usando 'null!' para simplificar a inicialização

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
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
        localStorage.clear();
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

  const [authState, setAuthState] = useState<AuthContextType>(initializeAuthState());

  const login = (newToken: string) => {
    const decoded: IPayload = jwtDecode(newToken);
    localStorage.setItem('token', newToken);
    setAuthState({
      token: newToken,
      isAdmin: decoded.isAdmin,
      name: decoded.name,
      email: decoded.email,
      login,
      logout,
    });
  };

  const logout = () => {
    localStorage.clear();
    setAuthState({
      token: null,
      isAdmin: false,
      name: '',
      email: '',
      login,
      logout,
    });
  };

  useEffect(() => {
    setAuthState((prevState) => ({
      ...prevState,
      login,
      logout,
    }));
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};
