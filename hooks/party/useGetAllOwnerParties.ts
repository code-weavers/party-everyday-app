import { ICustomError } from "@/interfaces/customError.interface"
import { IParty } from "@/interfaces/party.interface"
import { api } from "@/services/Axios"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetAllOwnerParties = () => {
   const { data, isLoading, refetch } = useQuery<IParty[], AxiosError<ICustomError>>({
      queryKey: ["ownerParties"],
      queryFn: async () => {
         const { data: parties } = await api.get<IParty[]>(`/parties/owner/me`)

         return parties
      },
      retry: 1,
      refetchInterval: 0,
      refetchOnMount: false,
      refetchOnReconnect: true,
   })

   return {
      ownerParties: data,
      isLoading,
      refetch,
   }
}