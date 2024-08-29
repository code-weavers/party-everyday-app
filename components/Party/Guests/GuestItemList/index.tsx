import { useRemoveGuest } from "@/hooks/party/useRemoveGuest";
import { IGuest } from "@/interfaces/guest.interface";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, ListItem } from "@rneui/base";
import { Button } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";

interface IGuestItemListProps {
   partyId: string;
   guest: IGuest;
   canDelete?: boolean;
}

export default function GuestItemList({ partyId, guest, canDelete }: IGuestItemListProps) {
   const { handleSubmit } = useRemoveGuest(partyId, String(guest.id));
   const avatar = guest.user.file?.url || "https://randomuser.me/api/portraits/men/33.jpg"

   return (
      <ListItem style={styles.container}>
         <Avatar source={{ uri: avatar }} />
         <ListItem.Content>
            <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
               {guest.user.username}
            </ListItem.Title>
            <ListItem.Subtitle
               style={{ color: "black", fontWeight: "condensed" }}
            >
               {formatStatus(String('ACCEPTED'))}
            </ListItem.Subtitle>
         </ListItem.Content>

         {canDelete && (
            <View style={styles.actionButtonContainer}>
               <Button radius={"sm"} type="solid" color={"error"} onPress={handleSubmit}>
                  <MaterialCommunityIcons name={"exit-run"} color={'white'} size={22} />
               </Button>
            </View>
         )}
      </ListItem>
   );
}

function formatStatus(status: string) {
   let color;
   switch (status) {
      case "PENDING":
         status = "Pending";
         color = "orange";
         break;
      case "ACCEPTED":
         status = "Accepted";
         color = "green";
         break;
      case "DECLINED":
         status = "Declined";
         color = "red";
         break;
      default:
         color = "black";
   }

   return <Text style={{ color: color }}>{status}</Text>;
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "white",
      marginVertical: 5,
      borderRadius: 5,
      padding: 10,
      maxWidth: "95%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      alignSelf: "center",

      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   actionButtonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      width: 100,
   },
});
