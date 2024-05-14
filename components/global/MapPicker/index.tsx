import { useState } from "react";
import { Button, Linking, Platform, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Coordinates {
   latitude: number;
   longitude: number;
}

interface MapPickerProps {
   snapPoints: string[];
   height: number;
   width: number;
   lat: number;
   long: number;
   latDelta: number;
   longDelta: number;
}

export default function MapPicker({
   snapPoints,
   height,
   width,
   lat,
   long,
   latDelta,
   longDelta,
}: MapPickerProps) {
   const [coordinates, setCoordinates] = useState<Coordinates>({
      latitude: lat,
      longitude: long,
   });

   return (
      <View style={{ justifyContent: "center" }}>
         <View style={{ alignItems: "center", backgroundColor: "red" }}>
            <MapView
               style={{
                  width,
                  height,
                  marginTop: "auto",
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
               }}
               initialRegion={{
                  latitude: Number(lat),
                  longitude: Number(long),
                  latitudeDelta: latDelta,
                  longitudeDelta: longDelta,
               }}
               onLongPress={(e) => {
                  console.log(e.nativeEvent);
                  setCoordinates({
                     latitude: e.nativeEvent.coordinate.latitude,
                     longitude: e.nativeEvent.coordinate.longitude,
                  });
               }}
               //expands the map to the full screen
            >
               <Marker
                  coordinate={{
                     latitude: coordinates.latitude,
                     longitude: coordinates.longitude,
                  }}
               />
            </MapView>
         </View>

         <View style={{ alignItems: "center" }}>
            <Button
               key={"open-maps"}
               title="Clique aqui para ver no maps"
               onPress={() => {
                  const url: string = String(
                     Platform.select({
                        ios: `maps:${lat},${long}`,
                        android: `geo:${lat},${long}`,
                     })
                  );

                  Linking.canOpenURL(url)
                     .then((supported) => {
                        if (supported) {
                           return Linking.openURL(url);
                        } else {
                           console.log("Don't know how to open URI: " + url);
                        }
                     })
                     .catch((err) => console.error("An error occurred", err));
               }}
            />
         </View>
      </View>
   );
}
