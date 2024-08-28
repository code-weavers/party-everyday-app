import { ICustomError } from "@/interfaces/customError.interface";
import { IUser } from "@/interfaces/user.interface";
import { api } from "@/services/Axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetAllUsers = () => {
   const { data = [], isLoading, refetch } = useQuery<IUser[], AxiosError<ICustomError>>({
      queryKey: ["users"],
      queryFn: async () => {
         const { data: userResponse } = await api.get<IUser[]>("/users")

         return userResponse
      },
      retry: 1,
      refetchInterval: 0,
      refetchOnMount: false,
   })

   return {
      users: data,
      isLoading,
      refetch
   }
}