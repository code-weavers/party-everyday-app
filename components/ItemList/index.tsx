import { IGuest } from "@/interfaces/guest.interface";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Avatar, CheckBox, ListItem } from "react-native-elements";

interface ItemListProps {
   guest: IGuest;
}

export default function ItemList({ guest }: ItemListProps) {
   const [selected, setSelected] = useState<boolean>(false);

   return (
      <ListItem key={guest.user.id} bottomDivider style={styles.container}>
         <Avatar rounded source={{ uri: guest.user.file.url }} />
         <ListItem.Content style={{ borderRadius: 5 }}>
            <ListItem.Title>
               <Text>{guest.user.username}</Text>
            </ListItem.Title>
            <ListItem.Subtitle>
               <Text>{"Online"}</Text>
            </ListItem.Subtitle>
         </ListItem.Content>
         <CheckBox
            center
            checked={guest.selected}
            onPress={() => {
               setSelected(!selected);
               guest.selected = !guest.selected;
            }}
         />
      </ListItem>
   );
}

const styles = StyleSheet.create({
   container: {
      marginBottom: 10,
      alignSelf: "center",
      width: "90%",
      borderRadius: 5,

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
