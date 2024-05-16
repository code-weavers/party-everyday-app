import useCurrentLocation from "@/hooks/useCurrentLocation";
import useMapPickerFocus from "@/hooks/useMapPickerFocus";
import { ICoordinates } from "@/interfaces/coordinates.interface";
import { useState } from "react";
import { Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface MapViewerProps {
   location: ICoordinates;
   setRegion: (region: ICoordinates) => void;
}

export default function MapViewer({ location, setRegion }: MapViewerProps) {
   const { latitude, longitude } = useCurrentLocation();
   const { longDelta, latDelta } = useMapPickerFocus(latitude);
   const { width, height } = Dimensions.get("screen");
   const [title, setTitle] = useState<string>("");
   const [description, setDescription] = useState<string>("");

   const handleChangeComplete = (region: ICoordinates) => {
      setTitle(region.latitude.toString());
      setDescription(region.longitude.toString());
      setRegion({
         latitude: region.latitude,
         longitude: region.longitude,
      });
   };

   return (
      <MapView
         style={{
            flex: 1,
            width: width * 0.9,
            maxHeight: height * 0.67,
            borderRadius: 5,
         }}
         region={{
            latitude: location.latitude === 0 ? latitude : location.latitude,
            longitude: location.latitude === 0 ? longitude : location.longitude,
            latitudeDelta: longDelta,
            longitudeDelta: latDelta,
         }}
         showsUserLocation={true}
         onRegionChangeComplete={(region) => {
            handleChangeComplete(region);
         }}
         onLongPress={(event) => {
            handleChangeComplete({
               latitude: event.nativeEvent.coordinate.latitude,
               longitude: event.nativeEvent.coordinate.longitude,
            });
         }}
      >
         <Marker
            coordinate={{
               latitude: location.latitude,
               longitude: location.longitude,
            }}
            title={title}
            description={description}
         />
      </MapView>
   );
}
