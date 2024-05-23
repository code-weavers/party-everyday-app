import { IGuest } from "@/interfaces/guest.interface";
import { Avatar, ListItem } from "@rneui/base";
import { StyleSheet, Text } from "react-native";

interface IGuestItemListProps {
   guest: IGuest;
}

export default function GuestItemList({ guest }: IGuestItemListProps) {
   return (
      <ListItem style={styles.container}>
         <Avatar
            source={{ uri: "https://randomuser.me/api/portraits/men/33.jpg" }}
         />
         <ListItem.Content>
            <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
               {guest.user.username}
            </ListItem.Title>
            <ListItem.Subtitle
               style={{ color: "black", fontWeight: "condensed" }}
            >
               {formatStatus(String(guest.status))}
            </ListItem.Subtitle>
         </ListItem.Content>
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
});
