import { IParty } from "@/interfaces/party.interface";
import { parties } from "@/mocks/party.mock";

export const useGetParty = (id: string) => {
   const partiesMock = parties as IParty[];

   const party = partiesMock.find(party => party.id === id) as IParty;

   return { party };
}