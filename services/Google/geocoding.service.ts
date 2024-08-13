import axios from "axios";
import { IGeocoding } from "./geocoding.interface";

interface IAddress {
   street: string;
   number: string;
   neighborhood: string;
   city: string;
   state: string;
   country: string;
   zipCode: string;
}

interface Coordinates {
   lat: string;
   lng: string;
}

const api = axios.create({
   baseURL: 'https://maps.googleapis.com/maps/api',
   headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
   }
})

export const getAddressByCoordinates = async ({ lat, lng }: Coordinates) => {
   const response = await api.get<IGeocoding>(`/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`)
   const responseAddress = response.data.results[0].address_components

   const address: IAddress = {
      number: responseAddress[0].types[0] === 'street_number' ? responseAddress[0].long_name : '',
      street: responseAddress[1].types[0] === 'route' ? responseAddress[1].long_name : responseAddress[0].long_name,
      neighborhood: responseAddress[2].types[0] === 'sublocality' ? responseAddress[2].long_name : '',
      city: responseAddress[3].types[0] === 'administrative_area_level_2' ? responseAddress[3].long_name : '',
      state: responseAddress[4].types[0] === 'administrative_area_level_1' ? responseAddress[4].long_name : '',
      country: responseAddress[5].types[0] === 'country' ? responseAddress[5].long_name : '',
      zipCode: responseAddress[6].types[0] === 'postal_code' ? responseAddress[6].long_name : '',
   }

   return address;
}