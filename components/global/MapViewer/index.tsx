import useMapPickerFocus from "@/hooks/useMapPickerFocus";
import { ICoordinates } from "@/interfaces/coordinates.interface";
import { useState } from "react";
import { Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface MapViewerProps {
   latitude: number;
   longitude: number;
   setRegion: (region: ICoordinates) => void;
}

export default function MapViewerTest({
   latitude,
   longitude,
   setRegion,
}: MapViewerProps) {
   const { longDelta, latDelta } = useMapPickerFocus(latitude);
   const { width, height } = Dimensions.get("screen");
   const [title, setTitle] = useState<string>("");
   const [description, setDescription] = useState<string>("");

   return (
      <MapView
         style={{
            flex: 1,
            width: width * 0.9,
            height: height * 0.2,
            borderRadius: 5,
         }}
         region={{
            latitude,
            longitude,
            latitudeDelta: longDelta,
            longitudeDelta: latDelta,
         }}
         showsUserLocation={true}
         onRegionChange={(region) => {
            setTitle(region.latitude.toString());
            setDescription(region.longitude.toString());
            setRegion({
               latitude: region.latitude,
               longitude: region.longitude,
            });
         }}
      >
         <Marker
            coordinate={{
               latitude,
               longitude,
            }}
            title={"Test"}
            description={"Test"}
         />
      </MapView>
   );
}
