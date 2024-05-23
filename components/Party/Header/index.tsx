import CustomTitle from "@/components/global/CustomTitle";
import { IParty } from "@/interfaces/party.interface";
import { formatBRDate, openMaps } from "@/utils";
import { Pressable, StyleSheet, Text, View } from "react-native";
import InformationDescription from "../InformationDescription";

interface PartyHeaderProps {
   party: IParty;
}

export default function PartyHeader({ party }: PartyHeaderProps) {
   const location =
      String(party?.address.street) +
      " " +
      String(party?.address.number) +
      ", " +
      String(party?.address.city) +
      " - " +
      String(party?.address.state) +
      ", " +
      String(party?.address.postalCode);

   return (
      <View style={styles.information}>
         <CustomTitle title={String(party?.name)} />
         <InformationDescription
            name={"Description"}
            value={String(party?.description)}
         />
         <InformationDescription
            name={"Date"}
            value={formatBRDate(String(party?.date))}
         />
         <View style={styles.location}>
            <InformationDescription
               name={"Location"}
               value={String(location)}
            />
            <Pressable
               style={styles.openMapsButton}
               onPress={() =>
                  openMaps(
                     String(party?.name),
                     String(party?.address.latitude),
                     String(party?.address.longitude)
                  )
               }
            >
               <Text style={{ color: "white" }}>Open in maps</Text>
            </Pressable>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   information: {
      flex: 1,
      width: "100%",
      backgroundColor: "#fff",
      padding: 10,
      marginHorizontal: 5,
      borderRadius: 5,
      maxWidth: "100%",
      maxHeight: "30%",

      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   location: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   openMapsButton: {
      backgroundColor: "black",
      padding: 10,
      marginRight: 20,
      borderRadius: 5,
      elevation: 2,
   },
});
