import { ICreateAddress } from "@/interfaces/address.interface";
import { ICustomError } from "@/interfaces/customError.interface";
import { ICreateParty, IParty } from "@/interfaces/party.interface";
import { api } from "@/services/Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "../useToast";

export const useCreateParty = (party: IParty) => {
   const { showToast } = useToast();
   const queryClient = useQueryClient();

   const address: ICreateAddress = {
      zipCode: String(party.address?.zipCode),
      state: String(party.address?.state),
      city: String(party.address?.city),
      street: String(party.address?.street),
      number: Number(party.address?.number),
      lat: String(party.address?.lat),
      lng: String(party.address?.lng),
   }

   const partyContent: ICreateParty = {
      name: String(party.name),
      description: String(party.description),
      date: String(new Date(String(party.date)).toISOString()),
      address,
   };

   if (party.guests?.length) {
      partyContent.guests = party.guests.map((guest) => {
         return {
            id: guest.user.id,
         };
      });
   }

   const { mutate } = useMutation<IParty, AxiosError<ICustomError>>({
      mutationFn: async () => {
         const { data } = await api.post<IParty>('/parties', partyContent);

         return data;
      },
      onSuccess: (data) => {
         queryClient.refetchQueries({ queryKey: ['parties'] });
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