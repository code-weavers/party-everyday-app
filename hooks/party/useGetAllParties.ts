import { IParty } from "@/interfaces/party.interface";
import { parties } from "@/mocks/party.mock";


export const useGetAllParties = () => {
   const partiesMock = parties as IParty[];

   return { parties: partiesMock };
}