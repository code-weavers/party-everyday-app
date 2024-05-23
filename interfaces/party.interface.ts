import { IAddress } from "./address.interface";
import { IGuest } from "./guest.interface";

export interface IParty {
   id: string;
   ownerId: string;
   name: string;
   date: string;
   description: string;
   address: IAddress;
   guests?: IGuest[];
   additionalInfo?: IAdditionalInfo[];
}

export interface IAdditionalInfo {
   id: string;
   name: string;
   value: number;
   createdAt: string;
}