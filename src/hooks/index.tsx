import { AuthProvider } from '@/services/auth.context';
import { ReactNode } from 'react';

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
	return <AuthProvider>{children}</AuthProvider>;
};
