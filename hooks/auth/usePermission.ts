import { ICustomError } from "@/interfaces/customError.interface";
import { IUser } from "@/interfaces/user.interface";
import { api } from "@/services/Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "../useToast";
import { useUserStore } from "../useUserStore";

interface IPermission {
   pushNotificationToken: string;
}

export const usePermission = () => {
   const queryClient = useQueryClient();
   const { setUser } = useUserStore();
   const toaster = useToast();

   const { mutate } = useMutation<IUser, AxiosError<ICustomError>, string>({
      mutationFn: async (pushNotificationToken) => {
         const { data } = await api.post<IUser>('/public/auth/permission', {
            pushNotificationToken,
         });

         return data;
      },
      onSuccess: (data) => {
         queryClient.setQueryData(['user'], data);

         setUser(data);
      },
      onError: (error) => {
         toaster.showToast({
            type: 'error',
            message: String(error.response?.data?.message),
         });
      },
   });

   const handleSubmit = async ({ pushNotificationToken }: IPermission) => mutate(pushNotificationToken)

   return {
      handleSubmit
   };
}