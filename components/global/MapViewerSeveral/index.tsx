import useCurrentLocation from "@/hooks/useCurrentLocation";
import useMapPickerFocus from "@/hooks/useMapPickerFocus";
import { IMarker } from "@/interfaces/coordinates.interface";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface MapViewerProps {
   currentLocation: IMarker;
   markers: IMarker[];
}

export default function MapViewerSeveral({ currentLocation, markers }: MapViewerProps) {
   const { latitude, longitude } = useCurrentLocation();
   const { longDelta, latDelta } = useMapPickerFocus(latitude);
   const { width, height } = Dimensions.get("screen");
   const navigation = useNavigation();

   return (
      <MapView
         style={{
            flex: 1,
            width: width * 0.9,
            maxHeight: height * 0.60,
            borderRadius: 5,
         }}
         region={{
            latitude: Number(currentLocation.latitude === 0 ? latitude : currentLocation.latitude),
            longitude: Number(currentLocation.longitude === 0 ? longitude : currentLocation.longitude),
            latitudeDelta: longDelta,
            longitudeDelta: latDelta,
         }}
         showsUserLocation={true}

      >
         {markers.map((marker, index) => (
            <Marker
               key={index}
               coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
               }}
               title={marker.title}
               description={marker.description}
               onCalloutPress={() => {
                  if (marker.partyId)
                     navigation.navigate("PartyContentScreen", { id: marker.partyId });
               }}
            />
         ))}
      </MapView>
   );
}
