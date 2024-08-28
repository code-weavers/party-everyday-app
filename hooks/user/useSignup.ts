import { ICustomError } from '@/interfaces/customError.interface';
import { IImagePickerAsset } from '@/interfaces/file.interface';
import { IUserSignupResponse } from '@/interfaces/user.interface';
import { api } from '@/services/Axios';
import StorageUtils from '@/utils/storage.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useToast } from '../useToast';


export const useSignup = () => {
   const toaster = useToast();
   const queryClient = useQueryClient();

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [email, setEmail] = useState('');
   const [telephoneNumber, setTelephoneNumber] = useState('');
   const [billingAccountKey, setBillingAccountKey] = useState('');
   const [file, setFile] = useState<IImagePickerAsset>();

   const { mutate } = useMutation<IUserSignupResponse, AxiosError<ICustomError>>({
      mutationFn: async () => {
         const formData = new FormData();

         if (file)
            // @ts-ignore
            formData.append('file', {
               uri: file?.uri,
               name: file?.fileName || 'image.jpg',
               type: file?.mimeType,
            });

         formData.append('username', username);
         formData.append('email', email);
         formData.append('telephoneNumber', telephoneNumber);
         formData.append('billingAccountKey', billingAccountKey);
         formData.append('password', password);

         const { data } = await api.post<IUserSignupResponse>('/users', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });

         return data;
      },
      onSuccess: (data) => {
         StorageUtils.set('accessToken', data.accessToken);

         queryClient.setQueryData(['user'], data);
      },
      onError: (error) => {
         toaster.showToast({
            type: 'error',
            message: String(error.response?.data?.message),
         });
      },
   });

   const handleSubmit = () => {
      const errorMessage = validateFields(username, email, password, confirmPassword);

      if (errorMessage.length > 0) {
         toaster.showToast({
            type: 'warning',
            message: errorMessage,
         });

         return;
      }

      mutate();
   };

   return {
      username,
      setUsername,
      email,
      setEmail,
      telephoneNumber,
      setTelephoneNumber,
      billingAccountKey,
      setBillingAccountKey,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      setFile,
      handleSubmit,
   };
};

function validateFields(username: string, email: string, password: string, confirmPassword: string): string {
   if (!username || !email || !password || !confirmPassword) {
      return 'All fields are required';
   }

   if (password !== confirmPassword) {
      return 'Password and confirm password do not match';
   }

   if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      return 'Invalid email';
   }

   return '';
}