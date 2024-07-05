import { ICustomError } from "@/interfaces/customError.interface";
import { IParty } from "@/interfaces/party.interface";
import { api } from "@/services/Axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";


export const useGetAllParties = () => {
   const { data, isLoading, refetch } = useQuery<IParty[], AxiosError<ICustomError>>({
      queryKey: ["all-parties"],
      queryFn: async () => {
         const { data: party } = await api.get<IParty[]>(`/parties`)

         return party
      },
      retry: 1,
      refetchInterval: 0,
      refetchOnMount: false,
      refetchOnReconnect: true,
   })

   return {
      parties: data,
      isLoading,
      refetch,
   }
}