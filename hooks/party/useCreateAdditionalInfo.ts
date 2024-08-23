import { AdditionalInfoType } from "@/enums";
import { ICustomError } from "@/interfaces/customError.interface";
import { IAdditionalInfo, ICreateAdditionalInfo } from "@/interfaces/party.interface";
import { api } from "@/services/Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useToast } from "../useToast";

export const useCreateAdditionalInfo = (partyId: string) => {
   const { showToast } = useToast();
   const queryClient = useQueryClient();
   const [additionalInfos, setAdditionalInfos] = useState<ICreateAdditionalInfo[]>([{ id: 'new', userId: '', name: "", value: 0, type: AdditionalInfoType.COST }]);

   const { mutate } = useMutation<IAdditionalInfo, AxiosError<ICustomError>>({
      mutationFn: async () => {
         const filteredInfos = additionalInfos.filter((info) => info.id !== 'new');

         const { data } = await api.post<IAdditionalInfo>(`/parties/${partyId}/additionalInfo`, { additionalInfo: filteredInfos });

         return data;
      },
      onSuccess: (data) => {
         queryClient.refetchQueries({ queryKey: ["party" + partyId] });

         showToast({
            message: "Additional info created!",
            type: "success",
         });

         setAdditionalInfos([{ id: 'new', userId: '', name: "", value: 0, type: AdditionalInfoType.COST }]);
      },
      onError: (error) => {
         showToast({
            type: 'error',
            message: String(error.response?.data?.message),
         });
      },
   });

   const handleSubmit = () => {
      const filteredInfos = additionalInfos.filter((info) => info.id !== 'new');

      for (const info of filteredInfos) {
         if (!info.name || !info.value) {
            showToast({
               type: 'error',
               message: 'Please fill all fields',
            });
            return;
         }

         info.value = Number(info.value.toString().replace(/,/g, ''));

         delete info.id;
      }

      mutate();
   }

   return {
      additionalInfos,
      setAdditionalInfos,
      handleSubmit,
   };
}