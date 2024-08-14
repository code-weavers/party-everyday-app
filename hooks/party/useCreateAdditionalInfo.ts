import { ICustomError } from "@/interfaces/customError.interface";
import { IAdditionalInfo, ICreateAdditionalInfo } from "@/interfaces/party.interface";
import { api } from "@/services/Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useToast } from "../useToast";

export const useCreateAdditionalInfo = (partyId: string) => {
   const [name, setName] = useState<string>("");
   const [value, setValue] = useState<string>("");
   const { showToast } = useToast();
   const queryClient = useQueryClient();

   const additionalInfoContent: ICreateAdditionalInfo = {
      name: name,
      value: Number(value),
   };

   const { mutate } = useMutation<IAdditionalInfo, AxiosError<ICustomError>>({
      mutationFn: async () => {
         const { data } = await api.post<IAdditionalInfo>(`/parties/${partyId}/additionalInfo`, additionalInfoContent);

         return data;
      },
      onSuccess: (data) => {
         queryClient.refetchQueries({ queryKey: ['parties'] });
         queryClient.refetchQueries({ queryKey: ["party" + partyId] });

         showToast({
            message: "Additional info created!",
            type: "success",
         });

         setName("");
         setValue("");
      },
      onError: (error) => {
         showToast({
            type: 'error',
            message: String(error.response?.data?.message),
         });
      },
   });

   const handleSubmit = () => {
      if (!name || !value) {
         showToast({
            type: 'error',
            message: 'Please fill all fields',
         });
         return;
      }

      mutate();
   }

   return {
      name,
      setName,
      value,
      setValue,
      handleSubmit,
   };
}