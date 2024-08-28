import { ICustomError } from "@/interfaces/customError.interface";
import { IParty } from "@/interfaces/party.interface";
import { api } from "@/services/Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "../useToast";

export const useRemoveGuest = (partyId: string, guestId: string) => {
   const { showToast } = useToast();
   const queryClient = useQueryClient();

   const { mutate } = useMutation<IParty, AxiosError<ICustomError>>({
      mutationFn: async () => {
         const { data } = await api.delete<IParty>(`parties/guests/${guestId}`);

         return data;
      },
      onSuccess: (data) => {
         queryClient.refetchQueries({ queryKey: ['party' + partyId] });
      },
      onError: (error) => {
         showToast({
            type: 'error',
            message: String(error.response?.data?.message),
         });
      },
   });

   const handleSubmit = () => {
      mutate();
   };

   return { handleSubmit };
};