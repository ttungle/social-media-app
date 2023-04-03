import { BASE_ROUTEs } from '@/constants/base-routes';
import { LoginPayloadData, RegisterPayloadData } from '@/models';
import { useQuery } from '@tanstack/react-query';
import { authApi } from './../api/auth';

export function useAuth() {
  const {
    data: userData,
    error,
    refetch,
  } = useQuery({
    queryKey: ['getProfile'],
    queryFn: async () => await authApi.getUserProfile(),
    retry: 1,
  });

  const isFirstLoading = userData === undefined && (error === undefined || error === null);

  const login = async (payload: LoginPayloadData) => {
    if (!payload) return;

    try {
      const result = await authApi.login(payload);
      localStorage.setItem('access_token', result?.token);
      refetch();
      window.location.href = BASE_ROUTEs.home;
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (payload: RegisterPayloadData) => {
    if (!payload) return;

    try {
      const result = await authApi.register(payload);
      localStorage.setItem('access_token', result?.token);
      refetch();
      window.location.href = BASE_ROUTEs.home;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    refetch();
  };

  return { user: userData?.data?.user ?? null, isFirstLoading, register, login, logout };
}
