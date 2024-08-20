import { IGuest } from "@/interfaces/guest.interface";
import { Avatar, CheckBox, ListItem } from "@rneui/base";
import { useState } from "react";
import { StyleSheet } from "react-native";

interface IGuestItemListProps {
   guest: IGuest;
   onSelect: () => void;
}

export default function InviteGuestItemList({ guest, onSelect }: IGuestItemListProps) {
   const [selected, setSelected] = useState<boolean>(false);

   return (
      <ListItem style={styles.container}>
         <Avatar
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/33.jpg" }}
         />
         <ListItem.Content>
            <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
               {guest.user.username}
            </ListItem.Title>
            <ListItem.Subtitle
               style={{ color: "black", fontWeight: "condensed" }}
            >
               Online
            </ListItem.Subtitle>
         </ListItem.Content>

         <CheckBox
            center
            checked={Boolean(guest.selected)}
            onPress={() => {
               setSelected(!selected);
               onSelect()
               guest.selected = !guest.selected;
            }}
         />
      </ListItem>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "white",
      marginVertical: 5,
      borderRadius: 5,
      padding: 5,
      maxWidth: "98%",
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
