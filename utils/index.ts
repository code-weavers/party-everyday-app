import { Linking, Platform } from "react-native";

export function formatBRDate(date: string): string {
   const options = { year: 'numeric', month: 'short', day: 'numeric' };
   return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
   });
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