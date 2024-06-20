import { IAddress, ICreateAddress } from "@/interfaces/address.interface";
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

   const { mutate: addressMutate } = useMutation<IAddress, AxiosError<ICustomError>, ICreateAddress>({
      mutationFn: async (): Promise<IAddress> => {
         const { data } = await api.post<IAddress>('/addresses', address);

         return data;
      },
      onSuccess: (data) => {
         showToast({
            type: 'success',
            message: `Endereço criado com sucesso!`,
         });

         queryClient.refetchQueries({ queryKey: ['addresses'] });
         queryClient.refetchQueries({ queryKey: ['address'] });

         return data;
      },
      onError: (error) => {
         showToast({
            type: 'error',
            message: String(error.response?.data?.message),
         });
      },
   });

   const { mutate: partyMutate } = useMutation<IParty, AxiosError<ICustomError>, ICreateParty>({
      mutationFn: async () => {
         const { data } = await api.post<IParty>('/parties', address);

         return data;
      },
      onSuccess: (data) => {
         showToast({
            type: 'success',
            message: `Rolê ${data.name} criado com sucesso!`,
         });

         queryClient.refetchQueries({ queryKey: ['parties'] });
         queryClient.refetchQueries({ queryKey: ['party'] });
      },
      onError: (error) => {
         showToast({
            type: 'error',
            message: String(error.response?.data?.message),
         });
      },
   });

   const handleSubmit = () => {
      const address: ICreateAddress = {
         zipCode: String(party.address?.zipCode),
         state: String(party.address?.state),
         city: String(party.address?.city),
         street: String(party.address?.street),
         number: Number(party.address?.number),
         lat: String(party.address?.lat),
         lng: String(party.address?.lng),
      }

      const createdAddress = addressMutate(address);

      const partyContent: ICreateParty = {
         name: String(party.name),
         description: String(party.description),
         date: String(party.date),
         //@ts-ignore
         addressId: createdAddress.id,
      };

      if (party.guests?.length) {
         partyContent.guests = party.guests.map((guest) => {
            return {
               id: guest.user.id,
            };
         });
      }

      partyMutate(partyContent);
   }

   return { handleSubmit };
};