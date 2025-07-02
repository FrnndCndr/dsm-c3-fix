import Api from './api';

export type AuthUser = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  token: string;
};

type RegisterData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

type ApiResponse<T> = {
  success: boolean;
  error: boolean;
  message: string;
  data: T;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthUser> => {
  const response = await Api.post<ApiResponse<AuthUser>>('/users/login', {
    email,
    password,
  });
  return response.data.data;
};

export const registerUser = async (
  data: RegisterData
): Promise<AuthUser> => {
  const response = await Api.post<ApiResponse<AuthUser>>('/users/register', data);
  return response.data.data;
};