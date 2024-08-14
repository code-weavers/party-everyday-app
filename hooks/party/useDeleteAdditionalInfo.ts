import { ICustomError } from "@/interfaces/customError.interface";
import { IAdditionalInfo } from "@/interfaces/party.interface";
import { api } from "@/services/Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "../useToast";

export const useDeleteAdditionalInfo = (partyId: string) => {
   const { showToast } = useToast();
   const queryClient = useQueryClient();

   const { mutate } = useMutation<IAdditionalInfo, AxiosError<ICustomError>, string>({
      mutationFn: async (additionalInfoId: string) => {
         const { data } = await api.delete<IAdditionalInfo>(`/parties/additionalInfo/${additionalInfoId}`);

         return data;
      },
      onSuccess: (data) => {
         queryClient.refetchQueries({ queryKey: ['parties'] });
         queryClient.refetchQueries({ queryKey: ["party" + partyId] });

         showToast({
            message: "Additional info deleted!",
            type: "success",
         });
      },
      onError: (error) => {
         showToast({
            type: 'error',
            message: String(error.response?.data?.message),
         });
      },
   });

   const handleSubmit = (additionalInfoId: string) => mutate(additionalInfoId);

   return { handleSubmit };
}