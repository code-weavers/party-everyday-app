export interface ICoordinates {
   placeId?: string;
   zipCode?: string;
   state?: string;
   city?: string;
   street?: string;
   number?: string;
   lat: string;
   lng: string;
}

export interface IMarker {
   partyId?: string;
   title: string;
   description: string;
   latitude: number;
   longitude: number;
}