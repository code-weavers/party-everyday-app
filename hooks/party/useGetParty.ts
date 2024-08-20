import { ICustomError } from "@/interfaces/customError.interface";
import { IParty } from "@/interfaces/party.interface";
import { api } from "@/services/Axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetParty = (id: string) => {
   const { data, isLoading, refetch } = useQuery<IParty, AxiosError<ICustomError>>({
      queryKey: ["party" + id],
      queryFn: async () => {
         const { data: party } = await api.get<IParty>(`/parties/${id}`)

         if (!party.additionalInfo) party.additionalInfo = []
         if (!party.guests) party.guests = []

         party.additionalInfo?.unshift({ id: 'new', name: '', value: 0, createdAt: '' })

         return party
      },
      retry: 1,
      refetchInterval: 0,
      refetchOnMount: false,
      refetchOnReconnect: true,
   })

   return {
      party: data,
      isLoading,
      refetch,
   }
}