import React, { createContext, useState, useContext, ReactNode } from 'react';
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

const AuthContext = createContext<AuthContextType | null>(null);

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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthContextType>({
    token: localStorage.getItem('token'),
    isAdmin: false,
    name: '',
    email: '',
    login: (newToken: string) => {
      const decoded: IPayload = jwtDecode(newToken);
      localStorage.setItem('token', newToken);
      setAuthState({
        ...authState,
        token: newToken,
        isAdmin: decoded.isAdmin,
        name: decoded.name,
        email: decoded.email
      });
    },
    logout: () => {
      localStorage.removeItem('token');
      setAuthState({
        ...authState,
        token: null,
        isAdmin: false,
        name: '',
        email: ''
      });
    }
  });
  
  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};
