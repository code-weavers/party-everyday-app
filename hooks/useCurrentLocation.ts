import * as Location from 'expo-location';
import { useEffect, useState } from "react";

export default function useCurrentLocation() {
   const [location, setLocation] = useState<Location.LocationObject>({
      coords: {
         latitude: 0,
         longitude: 0,
         altitude: 0,
         accuracy: 0,
         altitudeAccuracy: 0,
         heading: 0,
         speed: 0,
      },
      timestamp: 0,
   });

   useEffect(() => {
      (async () => {
         let { status } = await Location.requestForegroundPermissionsAsync();

         if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
         }

         let location = await Location.getCurrentPositionAsync({});

         setLocation(location);
      })();
   }, []);

   return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
   }
}