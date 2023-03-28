import { useAuth } from '@/hooks';
import { AuthContextData, AuthProviderProps } from '@/models';
import { createContext, useContext } from 'react';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuthContext = () => useContext(AuthContext);

function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuthContext };
