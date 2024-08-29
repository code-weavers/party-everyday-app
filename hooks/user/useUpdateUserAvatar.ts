import { ICustomError } from "@/interfaces/customError.interface";
import { IImagePickerAsset } from "@/interfaces/file.interface";
import { IUser } from "@/interfaces/user.interface";
import { api } from "@/services/Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useToast } from "../useToast";

export const useUpdateAvatar = (id: string) => {
   const queryClient = useQueryClient();
   const toast = useToast();

   const [file, setFile] = useState<IImagePickerAsset>();

   const { mutate } = useMutation<IUser, AxiosError<ICustomError>>({
      mutationFn: async () => {
         const formData = new FormData();

         // @ts-ignore
         formData.append('file', {
            uri: file?.uri,
            name: file?.fileName || `image.jpg`,
            type: file?.mimeType,
         });

         const { data } = await api.put<IUser>(`/users/${id}/avatar`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });

         return data;
      },
      onSuccess: (data) => {
         setFile(undefined);
         queryClient.refetchQueries({ queryKey: ['user'] });
      },
      onError: (error) => {
         toast.showToast({
            message: String(error.response?.data?.message),
            type: 'error',
         });
      },
   });

   const handleSubmit = () => mutate();

   return {
      file,
      setFile,
      handleSubmit,
   };
}