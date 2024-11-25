import { getUser, User } from '@/api/auth';
import { QUERIES, ROUTES } from '@/utils/constants';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// import { getUserStats } from 'api/user';
import { redirect } from 'next/navigation';
// import { QUERIES, ROUTES } from '';

export const useUser = (redirectOnFail?: boolean): UseQueryResult<User> =>
  useQuery({
    queryKey: [QUERIES.USERPROFILE],
    queryFn: () => getUser(),
    throwOnError: (error: AxiosError) => {
      if (error.response?.status === 401 && redirectOnFail) {
        redirect(`${ROUTES.login}?redirect=${window.location.pathname}`);
      }

      return false;
    },
  });
