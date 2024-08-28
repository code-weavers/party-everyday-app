import { ICustomError } from "@/interfaces/customError.interface";
import { IParty } from "@/interfaces/party.interface";
import { api } from "@/services/Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useToast } from "../useToast";

interface IInvitedGuests {
   guests: string[];
}

export const useAddGuest = (partyId: string) => {
   const { showToast } = useToast();
   const queryClient = useQueryClient();
   const [invitedFriends, setInvitedFriends] = useState<string[]>([]);

   const { mutate } = useMutation<IParty, AxiosError<ICustomError>>({
      mutationFn: async () => {
         const { data } = await api.post<IParty>(`parties/${partyId}/guests`, { guests: invitedFriends });

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

   return { invitedFriends, setInvitedFriends, handleSubmit };
};