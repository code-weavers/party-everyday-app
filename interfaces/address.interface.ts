export interface IAddress {
   id?: string;
   street: string;
   number: string;
   city: string;
   state: string;
   country?: string;
   zipCode: string;
   lat: string;
   lng: string;
}

export interface ICreateAddress {
   name?: string;
   street: string;
   number: number;
   city: string;
   state: string;
   country?: string;
   zipCode: string;
   lat: string;
   lng: string;
}