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

interface updateUserProfile {
  userId: string;
  image: string;
}

interface UserDetails {
  email: string;
  username: string;
  id: string;
  image: string;
  profileSetup: boolean;
}

interface contact {
  searchTerm: string;
}

export interface User {
  username: string;
  image: string;
  color: string;
  profileSetup: boolean;
  email: string;
  password: string;
  user: UserDetails;
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

export const updateProfile = async (body: updateUserProfile) => {
  const { data } = await apiClient.post(QUERIES.UPDATEPROFILE, body);

  postToLocalStorage(data.access_token ?? '');

  return data;
};

export const contacts = async (body: contact) => {
  const { data } = await apiClient.post(QUERIES.CONTACTS, body);

  // postToLocalStorage(data.access_token ?? '');

  return data;
};

export const getUser = async () => {
  const { data } = await apiClient.get(QUERIES.USERPROFILE);
  return data || {};
};
