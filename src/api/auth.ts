import { QUERIES } from '@/utils/constants';
import { apiClient } from './init';

interface Signup {
  username: string;
  email: string;
  password: string;
  confirmPwd?: string;
  access_token?: string;
}

interface Login {
  email: string;
  password: string;
  access_token?: string;
}

export interface User {
  username: string;

  email: string;
  password: string;

  access_token?: string;
}

const postToLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.setItem('token', key);
};

export const signUp = async (body: Signup) => {
  const { data } = await apiClient.post(QUERIES.SIGNUP, body);
  postToLocalStorage(data.access_token ?? '');

  return data;
};

export const logIn = async (body: Login) => {
  const { data } = await apiClient.post(QUERIES.LOGIN, body);

  postToLocalStorage(data.access_token ?? '');

  return data;
};

export const getUser = async () => {
  const { data } = await apiClient.get(QUERIES.USERPROFILE);
  return data || {};
};
