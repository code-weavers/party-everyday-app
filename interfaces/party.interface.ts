import { AdditionalInfoType } from "@/enums";
import { IAddress, ICreateAddress } from "./address.interface";
import { IGuest } from "./guest.interface";

export interface IParty {
   id?: string;
   ownerId?: string;
   name: string;
   date?: string;
   description: string;
   status?: string;
   address: IAddress;
   guests?: IGuest[];
   additionalInfo?: IAdditionalInfo[];
}

export interface IAdditionalInfo {
   id?: string;
   userId: string;
   name: string;
   value: number;
   type: AdditionalInfoType;
   createdAt?: string;
}

export interface ICreateParty {
   name: string
   description: string
   date: string
   address: ICreateAddress
   guests?: Guest[]
}

export interface ICreateAdditionalInfo {
   id?: string
   userId: string
   name: string
   value: number
   type: AdditionalInfoType
}

interface Guest {
   id: string
}