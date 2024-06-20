import moment from 'moment';
import { Linking, Platform } from "react-native";


export function formatBRDate(date: string): string {
   return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
   });
}

export function formatBRDateTime(date: string): string {
   return new Date(date).toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
   });
}

export function formatToTimestamp(date: string): string {
   const momentDate = moment(date, 'YYYY/MM/DD HH:mm');

   if (!momentDate.isValid()) {
      console.error(`Invalid date: ${date}`);
      return '';  // or throw new Error(`Invalid date: ${date}`);
   }

   return momentDate.toISOString();
}

export function formatBRCurrency(amount: number): string {
   return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
   }).format(amount);
}

export function truncateText(text: string, length: number): string {
   return text.length > length ? text.substring(0, length) + "..." : text;
}

export function openMaps(name: string, lat: string, lng: string) {
   const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
   const latLng = `${lat},${lng}`;

   const url = Platform.select({
      ios: `${scheme}${name}@${latLng}`,
      android: `${scheme}${latLng}(${name})`
   });

   if (url) Linking.openURL(url);
}