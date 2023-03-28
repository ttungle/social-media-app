import { LoginPayloadData, UserData } from '@/models';
import { useState } from 'react';
import { authApi } from './../api/auth';

export function useAuth() {
  const [user, setUser] = useState<UserData | null>(null);

  const login = async (payload: LoginPayloadData) => {
    if (!payload) return;

    try {
      const result = await authApi.login(payload);
      console.log(result);
      localStorage.setItem('access_token', result?.token);
      setUser(result?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  const register = (payload: any) => {};

  return { user, login };
}
