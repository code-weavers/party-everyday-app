import { IParty } from "@/interfaces/party.interface";
import { create } from "zustand";

type CreatePartyState = {
   party: IParty | undefined;
   setParty: (party: IParty | undefined) => void;
};

export const useCreatePartyStore = create<CreatePartyState>((set) => ({
   party: undefined,
   setParty: (party) => set({ party }),
}));