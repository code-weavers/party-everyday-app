import { ICustomError } from '@/interfaces/customError.interface';
import { IAuthCredentials, IUserLoginResponse } from '@/interfaces/user.interface';
import { api } from '@/services/Axios';
import StorageUtils from '@/utils/storage.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useToast } from '../useToast';
import { useUserStore } from '../useUserStore';

export const useAuth = () => {
   const { setUser } = useUserStore();
   const { showToast } = useToast();
   const queryClient = useQueryClient();

   const { mutate } = useMutation<
      IUserLoginResponse,
      AxiosError<ICustomError>,
      IAuthCredentials
   >({
      mutationFn: async ({ email, password }) => {
         const { data } = await api.post<IUserLoginResponse>(
            '/public/auth/login',
            { email, password }
         );

         return data;
      },
      onSuccess: async (data) => {
         StorageUtils.set('accessToken', data.accessToken);

         queryClient.setQueryData(['user'], data);

         setUser({
            id: data.id,
            username: data.username,
            email: data.email,
            file: data.file,
         });
      },
      onError: (error) => {
         showToast({
            type: 'error',
            message: error.response?.data.message || 'An error occurred',
         });

         return '';
      },
   });

   return {
      login: mutate,
      logout: () => {
         StorageUtils.remove('accessToken');
         queryClient.clear();
         queryClient.setQueryData(['user'], null);
         setUser(undefined);
      },
   };
};
