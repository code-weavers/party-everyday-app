import { ICustomError } from "@/interfaces/customError.interface"
import { IUser } from "@/interfaces/user.interface"
import { api } from "@/services/Axios"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useUserStore } from "../useUserStore"

export const useGetUser = () => {
   const { setUser } = useUserStore()
   const { data, isLoading } = useQuery<IUser, AxiosError<ICustomError>>({
      queryKey: ["user"],
      queryFn: async () => {
         const { data: userResponse } = await api.get<IUser>("/users/me")

         setUser(userResponse)

         return userResponse
      },
      retry: 1,
      refetchInterval: 0,
      refetchOnMount: false,
   })

   return {
      user: data,
      isLoading,
   }
}