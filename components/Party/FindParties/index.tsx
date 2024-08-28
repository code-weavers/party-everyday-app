import MapViewerSeveral from "@/components/global/MapViewerSeveral";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { IMarker } from "@/interfaces/coordinates.interface";
import { IParty } from "@/interfaces/party.interface";
import { StyleSheet, View } from "react-native";

interface FindPartiesProps {
   parties: IParty[];
}

export default function FindParties({ parties }: FindPartiesProps) {
   const { latitude, longitude } = useCurrentLocation();
   const currentLocation: IMarker = {
      title: "Current Location",
      description: "This is your current location",
      latitude,
      longitude,
   };
   const markers: IMarker[] = parties?.map((party) => {
      return {
         partyId: party.id,
         latitude: Number(party.address.lat),
         longitude: Number(party.address.lng),
         title: party.name,
         description: party.description,
      };
   }) || [];

   markers.push(currentLocation);

   return (
      <View style={styles.container}>
         <MapViewerSeveral currentLocation={currentLocation} markers={markers} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: "100%",
      height: "80%",
      borderRadius: 5,
   },
});

