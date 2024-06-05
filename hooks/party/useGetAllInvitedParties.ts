import { ICustomError } from "@/interfaces/customError.interface"
import { IParty } from "@/interfaces/party.interface"
import { api } from "@/services/Axios"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetAllInvitedParties = (userId: string) => {
   const { data, isLoading, refetch } = useQuery<IParty[], AxiosError<ICustomError>>({
      queryKey: ["invitedParties" + userId],
      queryFn: async () => {
         const { data: parties } = await api.get<IParty[]>(`/parties/guest/${userId}`)

         return parties
      },
      retry: 1,
      refetchInterval: 0,
      refetchOnMount: false,
      refetchOnReconnect: true,
   })

   return {
      invitedParties: data,
      isLoading,
      refetch,
   }
}