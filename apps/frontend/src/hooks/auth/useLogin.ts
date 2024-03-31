import * as api from '../../api';

export const useLogin = () => {
  const handleLogin = async (email: string, password: string) => {
    await api.auth.login({ email, password });
  };

  return {
    login: handleLogin,
  };
};
